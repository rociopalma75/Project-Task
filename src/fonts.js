import {Montserrat, Lusitana, Geist, Geist_Mono} from 'next/font/google';

export const montserrat = Montserrat({subsets: ['latin']})

export const lusitana = Lusitana({ subsets: ['latin'], weight: '400' })

export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
