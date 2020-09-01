const fs = require('fs');
const axios = require('axios');

const baseUrl = 'https://www.spinsamurai.com/';
const baseApiUrl = 'https://api.spinsamurai.com/api/en/page/list';

async function fetchPages () {
  const { data } = await axios.get(baseApiUrl);
  return data;
}

fetchPages()
  .then(res => {
    fs.writeFileSync('sitemap.xml' , buildSitemap(res.data));
  })
  .catch(e => {
    console.error(e);
  });

buildSitemap = ( data ) => {

  let xml = '';

  xml += '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';

  data.map(item => {
    const { slug } = item;

    xml += buildSitemapItem({ slug })
  });

  xml += '</urlset>\n';

  return xml
};

buildSitemapItem = ( data ) => {

  const { slug } = data;

  let xml = '';

  xml += '  <url>\n';
  xml += `    <loc>${baseUrl}en/${slug}</loc>\n`;
  xml += `    <xhtml:link rel="alternate" hreflang="en-ca" href="${baseUrl}en-ca/${slug}" />\n`;
  xml += `    <xhtml:link rel="alternate" hreflang="en-nz" href="${baseUrl}en-nz/${slug}" />\n`;
  xml += `    <xhtml:link rel="alternate" hreflang="en-au" href="${baseUrl}en-au/${slug}" />\n`;
  xml += '  </url>\n';

  return xml
};