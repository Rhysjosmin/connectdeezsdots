import { Noto_Sans, Poppins, Rubik, Space_Grotesk } from "next/font/google";

export const noto_sans = Noto_Sans({ subsets: ["latin"] });
export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "300", "900"],
});

export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300"],
});
