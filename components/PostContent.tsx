import { JSONContent } from "@tiptap/react";
import { ReactNode } from "react";

export default function PostContent({ content }: { content: JSONContent }) {
  return <>{renderPost(content)}</>;
}

function renderPost(postContent: JSONContent): ReactNode {
  if (!postContent.type) {
    return null;
  }
  switch (postContent.type) {
    case "doc":
      if (postContent.content) {
        return (
          <article className="flex flex-col gap-2 py-8 leading-8 sm:text-lg">
            {postContent.content.map((child, index) => (
              <div key={index}>{renderPost(child)}</div>
            ))}
          </article>
        );
      } else {
        return null;
      }
    case "paragraph":
      if (postContent.content) {
        return (
          <p>
            {postContent.content.map((child, index) => (
              <span key={index}>{renderPost(child)}</span>
            ))}
          </p>
        );
      } else {
        return null;
      }
    case "bulletList":
      if (postContent.content) {
        return (
          <ul className="flex flex-col gap-1 pl-8 list-disc">
            {postContent.content.map((child, index) => (
              <div key={index}>{renderPost(child)}</div>
            ))}
          </ul>
        );
      } else {
        return null;
      }
    case "orderedList":
      if (postContent.content) {
        return (
          <ol className="flex flex-col gap-1 pl-8 leading-relaxed list-decimal">
            {postContent.content.map((child, index) => (
              <div key={index}>{renderPost(child)}</div>
            ))}
          </ol>
        );
      } else {
        return null;
      }
    case "listItem":
      if (postContent.content) {
        return (
          <li>
            {postContent.content.map((child, index) => (
              <div key={index} className="flex">
                {renderPost(child)}
              </div>
            ))}
          </li>
        );
      } else {
        return null;
      }
    case "heading":
      if (postContent.content) {
        switch (postContent.attrs?.level) {
          case 1:
            return (
              <h1 className="mt-6 mb-4 text-3xl font-bold">
                {postContent.content.map((child, index) => (
                  <span key={index}>{renderPost(child)}</span>
                ))}
              </h1>
            );
          case 2:
            return (
              <h2 className="mt-5 mb-3 text-2xl font-semibold">
                {postContent.content.map((child, index) => (
                  <span key={index}>{renderPost(child)}</span>
                ))}
              </h2>
            );
          case 3:
            return (
              <h3 className="mt-4 mb-2 text-xl font-medium">
                {postContent.content.map((child, index) => (
                  <span key={index}>{renderPost(child)}</span>
                ))}
              </h3>
            );
          case 4:
            return (
              <h3 className="mt-3 mb-2 text-lg font-medium">
                {postContent.content.map((child, index) => (
                  <span key={index}>{renderPost(child)}</span>
                ))}
              </h3>
            );
          case 5:
            return (
              <h5 className="mt-2 mb-1 text-base font-medium">
                {postContent.content.map((child, index) => (
                  <span key={index}>{renderPost(child)}</span>
                ))}
              </h5>
            );
          case 6:
            return (
              <h6 className="mt-1 mb-1 text-sm font-medium">
                {postContent.content.map((child, index) => (
                  <span key={index}>{renderPost(child)}</span>
                ))}
              </h6>
            );
          default:
            return null;
        }
      } else {
        return null;
      }
    case "text":
      return (
        <span className={`${getClassNameFromMarks(postContent.marks)}`}>
          {postContent.text}
        </span>
      );
    default:
      return <p>Nothing here</p>;
  }
}

function getClassNameFromMarks(
  marks:
    | {
        type: string;
        attrs?: { [key: string]: any };
      }[]
    | undefined,
) {
  if (marks) {
    return marks
      .map((mark) => {
        switch (mark.type) {
          case "bold":
            return " text-bold";
          case "underline":
            return " underline";
          case "italic":
            return " italic";
          case "strike":
            return " line-through";
          default:
            return " ";
        }
      })
      .join(" ");
  }
}
