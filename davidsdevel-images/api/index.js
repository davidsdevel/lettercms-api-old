module.exports = (_, res) => res.json({hello: 'World'})

async function pageTokenExample(){
  // Create a reference under which you want to list
  var listRef = storageRef.child('files/uid');
  // Fetch the first page of 100.
  var firstPage = await listRef.list({ maxResults: 100});
  // Use the result.
  // processItems(firstPage.items)
  // processPrefixes(firstPage.prefixes)
  // Fetch the second page if there are more elements.
  if (firstPage.nextPageToken) {
    var secondPage = await listRef.list({
      maxResults: 100,
      pageToken: firstPage.nextPageToken,
    });
    // processItems(secondPage.items)
    // processPrefixes(secondPage.prefixes)
  }
}
