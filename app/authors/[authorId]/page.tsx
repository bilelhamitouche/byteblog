export default async function Author({ params }: { params: Promise<{ authorId: string }> }) {
  const authorId = decodeURIComponent((await params).authorId);
  return (
    <div className="p-8 py-28 w-full h-full flex justify-center items-center">Author is: {authorId.split("@")[1]}</div>
  )
}
