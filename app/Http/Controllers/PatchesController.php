<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class PatchesController extends Controller
{
    public function index()
    {
        // Fetch the patch notes page HTML
        $response = Http::get('https://www.leagueoflegends.com/en-us/news/tags/patch-notes/');
        $html = $response->body();

        // Use DOMDocument to parse the HTML and extract patch titles, links, and banners
        $patches = [];
        libxml_use_internal_errors(true);
        $dom = new \DOMDocument();
        $dom->loadHTML($html);
        $xpath = new \DOMXPath($dom);

        // Find patch note articles (each article is a <a> tag with a patch link)
        $articles = $xpath->query("//a[contains(@href, '/en-us/news/game-updates/patch-')]");

        foreach ($articles as $article) {
            if ($article instanceof \DOMElement && $article->hasAttribute('href')) {
                $title = trim($article->textContent);
                $link = $article->getAttribute('href');
                // Ensure full URL
                if (strpos($link, 'http') !== 0) {
                    $link = 'https://www.leagueoflegends.com' . $link;
                }

                $patches[] = [
                    'title' => $title,
                    'url' => $link,
                ];
            }
        }

        // Remove duplicates by URL and keep only the latest 12 patches
        $unique = [];
        foreach ($patches as $patch) {
            if (!isset($unique[$patch['url']])) {
                $unique[$patch['url']] = $patch;
            }
        }
        $patches = array_slice(array_values($unique), 0, 12);

        return Inertia::render('patches', [
            'patches' => $patches,
        ]);
    }
}
