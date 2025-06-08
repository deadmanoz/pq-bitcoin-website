import CoverImage from "./cover-image";
import DateFormatter from "./date-formatter";
import { PostTitle } from "@/app/_components/post-title";
import { type Author } from "@/interfaces/author";

type Props = {
  title: string;
  coverImage: string;
  coverImageLink?: string;
  date: string;
  author: Author;
};

export function PostHeader({ title, coverImage, coverImageLink, date, author }: Props) {
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div className="mb-8">
        <div className="text-cyber-cyan font-bold text-lg">
          By <span className="text-cyber-pink">{author.name}</span>
        </div>
        <div className="text-cyber-yellow/80 text-sm mt-2">
          <DateFormatter dateString={date} />
        </div>
      </div>
      <div className="mb-8 md:mb-16 sm:mx-0">
        <CoverImage title={title} src={coverImage} coverImageLink={coverImageLink} />
      </div>
    </>
  );
}
