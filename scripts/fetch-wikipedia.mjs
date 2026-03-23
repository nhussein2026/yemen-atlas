import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';

// Configuration
const PAGES = {
    en: {
        title: 'Yemen',
        endpoint: 'https://en.wikipedia.org/w/api.php'
    },
    ar: {
        title: 'اليمن',
        endpoint: 'https://ar.wikipedia.org/w/api.php'
    }
};

async function fetchWikipediaPage(lang, config) {
    const params = new URLSearchParams({
        action: 'parse',
        page: config.title,
        prop: 'sections|text|displaytitle',
        format: 'json',
        origin: '*'
    });

    const url = `${config.endpoint}?${params}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.error) {
            throw new Error(data.error.info);
        }

        return {
            language: lang,
            title: data.parse.title,
            displaytitle: data.parse.displaytitle,
            pageid: data.parse.pageid,
            sections: data.parse.sections,
            content: data.parse.text['*'],
            url: `https://${lang}.wikipedia.org/wiki/${encodeURIComponent(config.title)}`,
            fetchedAt: new Date().toISOString()
        };
    } catch (error) {
        console.error(`Error fetching ${lang} Wikipedia:`, error);
        throw error;
    }
}

// Function to extract and structure sections
function extractStructuredContent(wikiData) {
    // Parse the HTML content to extract sections
    // This is a simplified version - you might want to use a proper HTML parser
    const html = wikiData.content;
    const sections = [];

    // Extract h2 sections (main topics)
    const h2Regex = /<h2>.*?<span class="mw-headline" id="([^"]+)">([^<]+)<\/span>.*?<\/h2>([\s\S]*?)(?=<h2>|$)/g;
    let match;

    while ((match = h2Regex.exec(html)) !== null) {
        const [_, id, title, content] = match;

        // Clean up the content (remove edit links, etc.)
        const cleanContent = content
            .replace(/<span class="mw-editsection">[\s\S]*?<\/span>/g, '')
            .replace(/<sup[^>]*>[\s\S]*?<\/sup>/g, '')
            .trim();

        sections.push({
            id,
            title: title.trim(),
            level: 2,
            content: cleanContent,
            wordCount: cleanContent.replace(/<[^>]*>/g, ' ').split(/\s+/).length
        });
    }

    return {
        ...wikiData,
        sections: sections.filter(s => s.wordCount > 50), // Filter out very short sections
        totalSections: sections.length
    };
}

// Main function
async function main() {
    console.log('📚 Fetching Wikipedia content for Yemen...');

    const outputDir = join(process.cwd(), 'src/content/wikipedia');

    // Create directory if it doesn't exist
    if (!existsSync(outputDir)) {
        mkdirSync(outputDir, { recursive: true });
    }

    // Fetch both languages
    const results = {};

    for (const [lang, config] of Object.entries(PAGES)) {
        console.log(`\n🌐 Fetching ${lang} content...`);

        try {
            const wikiData = await fetchWikipediaPage(lang, config);
            const structured = extractStructuredContent(wikiData);

            // Save to file
            const filename = join(outputDir, `${lang}-yemen.json`);
            writeFileSync(filename, JSON.stringify(structured, null, 2));

            console.log(`✅ Saved ${structured.sections.length} sections to ${filename}`);
            results[lang] = structured;
        } catch (error) {
            console.error(`❌ Failed to fetch ${lang}:`, error.message);
        }
    }

    // Create an index file with metadata
    const index = {
        fetchedAt: new Date().toISOString(),
        languages: Object.keys(results),
        stats: Object.fromEntries(
            Object.entries(results).map(([lang, data]) => [
                lang,
                { sections: data.sections.length, title: data.title }
            ])
        )
    };

    writeFileSync(
        join(outputDir, 'index.json'),
        JSON.stringify(index, null, 2)
    );

    console.log('\n🎉 Wikipedia content fetched successfully!');
    console.log('📊 Stats:', index.stats);
}

// Run if this script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
    main().catch(console.error);
}

export { fetchWikipediaPage, extractStructuredContent };