const { findOne, updateOne } = require('./mongoUtils');

const COLLECTION_INSPECTOR_METADATA = 'colony-inspector-metadata';

/*
* Returns the snapshot date saved in general-store.
*
* See the README for a detailed description of the snapshot date.
*/
getSnapshotDate = async () => {
  const snapshotDate = await findOne(COLLECTION_INSPECTOR_METADATA, {'name': 'colony-inspector-metadata'}, {'snapshot-date': 1}, '');
  return snapshotDate['snapshot-date'];
}

/*
* Sets the snapshot date saved in general-store.
*
* See the README for a detailed description of the snapshot date.
*/
setSnapshotDate = async (newSnapshotDate) => {
  await updateOne(COLLECTION_INSPECTOR_METADATA, {'name': 'colony-inspector-metadata'}, {'snapshot-date': newSnapshotDate}, false);
}


module.exports = {
  getSnapshotDate,
  setSnapshotDate
};
