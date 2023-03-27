const fetchBlobObjects = () =>
  fetch("/api/getBlobObjects", { cache: "no-store" }).then((res) => res.json());

export default fetchBlobObjects;
