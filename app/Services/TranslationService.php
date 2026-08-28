<?php

namespace App\Services;

class TranslationService
{
    /**
     * Translate any given text or dynamic database field based on the current app locale.
     * Handles string normalization, line breaks, case variations, and fallback matching.
     */
    public static function translate(?string $text): string
    {
        if ($text === null || trim($text) === '') {
            return '';
        }

        $locale = app()->getLocale();
        $path = lang_path($locale . '.json');

        if (!file_exists($path)) {
            return $text;
        }

        static $dictionaries = [];
        if (!isset($dictionaries[$locale])) {
            $dictionaries[$locale] = json_decode(file_get_contents($path), true) ?? [];
        }

        $dict = $dictionaries[$locale];
        $normalized = str_replace("\r\n", "\n", trim($text));

        // 1. Direct exact match
        if (isset($dict[$normalized])) {
            return $dict[$normalized];
        }

        // 2. Case-insensitive / uppercase / lowercase match
        $lowerNorm = mb_strtolower($normalized);
        foreach ($dict as $key => $val) {
            $normKey = str_replace("\r\n", "\n", trim($key));
            if ($normKey === $normalized || mb_strtolower($normKey) === $lowerNorm) {
                return $val;
            }
        }

        return $text;
    }
}
