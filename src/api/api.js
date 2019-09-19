import axios from "axios";
import Filter from "bad-words";
import striptags from "striptags";

const filter = new Filter();
const API_URL = "https://api.flickr.com/services/rest/";

const DEFAULT_PARAMS = {
  api_key: "fbb18c11c83de0d21ee27d456e828586",
  safe_search: 1,
  per_page: 40,
  format: "json",
  nojsoncallback: 1,
  extras: "owner_name,description,tags"
};

if (!process.env.REACT_APP_FLICKR_API_KEY) {
  console.error("No Flickr API key found. Please refer to documentation.");
}

/**
 * Returns Flickr photo URL based on the photo's ID and CDN attributes.
 * @param {Object} photo Flickr photo object
 * @return String Photo URL
 */
function getPhotoURL(photo) {
  const { id, farm, secret, server } = photo;

  return `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`;
}

/**
 * Returns Flickr photo URL for the author, based on the photo's ID and CDN attributes.
 * @param {Object} photo Flickr photo object
 * @return String Author URL
 */
function getAuthorURL(photo) {
  return `https://www.flickr.com/people/${photo.owner}/`;
}

/**
 * Returns latest photos from public Flickr feed.
 * @param {string} [tags] Tags to filter by.
 * @return Promise
 */
export async function fetchPhotos(page) {
  // Search does not support parameterless searching, in which case we fall back to getRecent.
  const params = {
    ...DEFAULT_PARAMS,
    method: "flickr.photos.search",
    page,
    tags: ",bikerace"
  };

  try {
    const response = await axios.get(API_URL, { params });
    const { photo } = response.data.photos;
    const photos = photo || [];
    return photos
      .filter(item => !filter.isProfane(item.title) && item.farm !== 0)
      .map(item => {
        item.description._content = striptags(item.description._content);
        item.photoURL = getPhotoURL(item);
        item.authorURL = getAuthorURL(item);
        return item;
      });
  } catch (error) {
    new Error("Flickr request failed.");
  }
}


export default {
  fetchPhotos
};

