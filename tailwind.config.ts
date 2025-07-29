import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';
import tailwindcssAnimate from 'tailwindcss-animate';
import typography from '@tailwindcss/typography';

const config: Config = {
  darkMode: "class", 
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
  	extend: {
  		fontFamily: {
  			sans: ['var(--font-sans)'],
  			serif: ['var(--font-serif)'],
  			dopamine: ['var(--font-dopamine)'],
  			zen: ['var(--font-zen)'],
  			solarpunk: ['var(--font-solarpunk)'],
  			artisan: ['var(--font-artisan)'],
  			brutalist: ['var(--font-brutalist)']
  		},
  		boxShadow: {
  			'glass-inset': 'inset 0 1px 0 0 hsl(var(--border))',
  			'pop-out': '4px 4px 0px 0px hsl(var(--border))'
  		},
  		colors: {
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: { height: '0' },
  				to: { height: 'var(--radix-accordion-content-height)' }
  			},
  			'accordion-up': {
  				from: { height: 'var(--radix-accordion-content-height)' },
  				to: { height: '0' }
  			},
  			blink: {
  				'from, to': { borderColor: 'transparent' },
  				'50%': { borderColor: 'currentColor' }
  			},
  			moveBlob: {
  				'0%': { transform: 'translate(-50%, -50%) scale(1)', opacity: '0.7' },
  				'25%': { transform: 'translate(-40%, -60%) scale(1.1)', opacity: '0.8' },
  				'50%': { transform: 'translate(-60%, -40%) scale(0.9)', opacity: '0.6' },
  				'75%': { transform: 'translate(-30%, -70%) scale(1.2)', opacity: '0.9' },
  				'100%': { transform: 'translate(-50%, -50%) scale(1)', opacity: '0.7' }
  			},
  			glitch: {
  				'0%, 100%': { transform: 'translate(0, 0)' },
  				'20%': { transform: 'translate(-2px, 2px)' },
  				'40%': { transform: 'translate(-2px, -2px)' },
  				'60%': { transform: 'translate(2px, 2px)' },
  				'80%': { transform: 'translate(2px, -2px)' }
  			},
        aurora: {
          from: { "background-position": '0% 50%' },
          to: { "background-position": '100% 50%' },
        },
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out',
  			blink: 'blink 1s step-end infinite',
  			'aurora-move': 'moveBlob 12s ease-in-out infinite alternate',
  			glitch: 'glitch 0.2s linear infinite',
		'aurora': 'aurora 8s ease-in-out infinite alternate',
	  },
	},
  },
  plugins: [
	tailwindcssAnimate,
	typography,
	plugin(function({ addVariant }) {
	  addVariant('theme-warm-sunshine', '.theme-warm-sunshine &');
	  addVariant('theme-dopamine-pop', '.theme-dopamine-pop &');
	  addVariant('theme-zen-ink', '.theme-zen-ink &');
	  addVariant('theme-solarpunk-utopia', '.theme-solarpunk-utopia &');
	  addVariant('theme-rustic-artisan', '.theme-rustic-artisan &');
	  addVariant('theme-brutalist-glitch', '.theme-brutalist-glitch &');
	})
  ],
}
export default config