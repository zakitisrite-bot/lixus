import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            // ── Typography ─────────────────────────────────────────────────────
            fontFamily: {
                display: ['"Cormorant Garamond"', 'Georgia', ...defaultTheme.fontFamily.serif],
                body:    ['"EB Garamond"', 'Georgia', ...defaultTheme.fontFamily.serif],
                sans:    ['Inter', ...defaultTheme.fontFamily.sans],
                // Legacy aliases kept for backward compatibility
                serif:   ['"Cormorant Garamond"', 'Georgia', ...defaultTheme.fontFamily.serif],
            },

            // ── Colors — Louvre Abu Dhabi Design System ────────────────────────
            colors: {
                // Core Brand (Lixus — kept for admin/email components)
                lixus: {
                    red:     '#C52034',
                    black:   '#0F0F0F',
                    beige:   '#FDFBF7',
                    gold:    '#A67C52',
                    muted:   '#6B7280',
                    border:  '#E8E4DE',
                    surface: '#FFFFFF',
                    subtle:  '#F7F5F2',
                },
                // LAD Design System
                lad: {
                    // Primary
                    black:        '#000000',
                    white:        '#FFFFFF',
                    'off-black':  '#212529',

                    // Aquamarine accents
                    aqua:         '#97D2D4',
                    'soft-teal':  '#AACCCC',
                    teal:         '#0DCAF0',

                    // Interactive
                    navy:         '#172B4A',
                    success:      '#198754',
                    error:        '#DC3545',
                    warning:      '#FFC107',

                    // Neutrals
                    'dark-grey':    '#3C3C3C',
                    'mid-grey':     '#707070',
                    'light-grey':   '#9D9D9D',
                    'lighter-grey': '#EDEDED',
                    'barely-grey':  '#DDDDDD',
                    'off-white':    '#F8F9FA',
                    'dark-charcoal':'#343A40',
                },
            },

            // ── Spacing (4px base scale) ────────────────────────────────────────
            spacing: {
                '13': '52px',
                '15': '60px',
                '18': '72px',
            },

            // ── Shadows — Elevation scale ───────────────────────────────────────
            boxShadow: {
                'lad-1': '0px 2px 4px rgba(0, 0, 0, 0.08)',
                'lad-2': '0px 4px 12px rgba(0, 0, 0, 0.10)',
                'lad-3': '0px 8px 24px rgba(0, 0, 0, 0.15)',
                'lad-4': '0px 12px 32px rgba(0, 0, 0, 0.20)',
                // Admin cards
                'card':      '0 1px 3px 0 rgba(0,0,0,0.06), 0 1px 2px -1px rgba(0,0,0,0.04)',
                'card-hover':'0 8px 30px -4px rgba(0,0,0,0.10), 0 2px 8px -2px rgba(0,0,0,0.06)',
                'nav':       '0 1px 0 0 rgba(0,0,0,0.06)',
            },

            // ── Border radius — ZERO everywhere for LAD precision ───────────────
            borderRadius: {
                'none': '0px',
                DEFAULT: '0px',
                // Keep these for admin panel components
                'sm':  '0px',
                'md':  '0px',
                'lg':  '0px',
                'xl':  '0px',
                '2xl': '0px',
                '3xl': '0px',
                'full': '9999px', // Only for indicators/dots
            },

            // ── Max Width ───────────────────────────────────────────────────────
            maxWidth: {
                'lad': '1440px',
            },

            // ── Letter spacing — none in LAD ────────────────────────────────────
            letterSpacing: {
                'lad': '0px',
            },
        },
    },

    plugins: [forms],
};