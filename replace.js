const fs = require('fs');

const pagePath = 'app/admin/media-partners/page.tsx';
let page = fs.readFileSync(pagePath, 'utf8');
page = page.replace(/SponsorsAdmin/g, 'MediaPartnersAdmin');
page = page.replace(/SponsorModal/g, 'MediaPartnerModal');
page = page.replace(/'sponsors'/g, "'media_partners'");
page = page.replace(/sponsors/g, 'partners');
page = page.replace(/setSponsors/g, 'setPartners');
page = page.replace(/fetchSponsors/g, 'fetchPartners');
page = page.replace(/filteredSponsors/g, 'filteredPartners');
page = page.replace(/selectedSponsor/g, 'selectedPartner');
page = page.replace(/setSelectedSponsor/g, 'setSelectedPartner');
page = page.replace(/sponsor\./g, 'partner.');
page = page.replace(/sponsor:/g, 'partner:');
page = page.replace(/\(sponsor: any/g, '(partner: any');
page = page.replace(/Mitra & Sponsor/g, 'Media Partner');
page = page.replace(/mitra, sponsor, dan media partner/g, 'media partner');
page = page.replace(/Mitra/g, 'Media Partner');
page = page.replace(/mitra/g, 'media partner');
fs.writeFileSync(pagePath, page);

const modalPath = 'components/admin/MediaPartnerModal.tsx';
let modal = fs.readFileSync(modalPath, 'utf8');
modal = modal.replace(/SponsorModal/g, 'MediaPartnerModal');
modal = modal.replace(/\.from\('sponsors'\)/g, ".from('media_partners')");
modal = modal.replace(/sponsor/g, 'partner');
modal = modal.replace(/Sponsor/g, 'Media Partner');
modal = modal.replace(/Mitra\/Media Partner/g, 'Media Partner');
modal = modal.replace(/media_partnerss/g, 'media_partners'); // fix accidental double s
fs.writeFileSync(modalPath, modal);
