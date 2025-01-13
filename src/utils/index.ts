export function stripHtmlTags(html: string) {
  if (!html) return "";

  const withoutImages = html.replace(
    /<img[^>]*>|<img.*?\/?>|\s*<img[^>]*src="[^"]*"[^>]*>/g,
    "",
  );

  const withoutFirebaseUrls = withoutImages.replace(
    /<img src="https:\/\/firebasestorage\.googleapis\.com[^"]*"[^>]*>/g,
    "",
  );

  const withoutPlainTextUrls = withoutFirebaseUrls.replace(
    /<img src="https:\/\/firebasestorage\.googleapis\.com[^"]*"/g,
    "",
  );

  const withoutUrls = withoutPlainTextUrls
    .replace(
      /<img src="https:\/\/firebasestorage\.googleapis\.com.*?(?=")/g,
      "",
    )
    .replace(/https:\/\/firebasestorage\.googleapis\.com[^\s]*/g, "")
    .replace(/<img src="/g, "");

  const withoutTags = withoutUrls.replace(/<[^>]*>/g, "");
  const decoded = withoutTags.replace(/&[^;]+;/g, " ");

  return decoded.replace(/\s+/g, " ").trim();
}
