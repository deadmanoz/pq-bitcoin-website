import cn from "classnames";
import Link from "next/link";
import Image from "next/image";

type Props = {
  title: string;
  src: string;
  slug?: string;
  coverImageLink?: string;
};

const CoverImage = ({ title, src, slug, coverImageLink }: Props) => {
  const image = (
    <Image
      src={src}
      alt={`Cover Image for ${title}`}
      className={cn("w-full rounded-lg overflow-hidden border-2 border-cyber-cyan/30", {
        "hover:border-cyber-pink hover:shadow-[0_0_20px_rgba(255,0,110,0.5)] transition-all duration-300": slug,
      })}
      width={1300}
      height={630}
    />
  );
  return (
    <div className="sm:mx-0">
      {coverImageLink ? (
        <a href={coverImageLink} target="_blank" rel="noopener noreferrer" aria-label={title}>
          {image}
        </a>
      ) : slug ? (
        <Link href={`/posts/${slug}`} aria-label={title}>
          {image}
        </Link>
      ) : (
        image
      )}
    </div>
  );
};

export default CoverImage;
