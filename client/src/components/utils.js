export const download = (content, fileName, contentType) => {
 const a = document.createElement("a");
 const file = new Blob([content], { type: contentType });
 a.href = URL.createObjectURL(file);
 a.download = fileName;
 a.click();
}

export const downloadJSON = (data, fileName) => {
 download(JSON.stringify(data), fileName, "text/plain");
}
