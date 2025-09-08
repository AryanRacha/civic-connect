# 📌 Crowdsourced Civic Issue Reporting System (SIH Project)

## 🎯 Core Idea

A system where citizens report civic issues (roads, water, waste, electricity), government departments track & resolve them, and progress is transparent.

---

## 👥 Users & Their Roles

### Citizens

- Report issues (photo, GPS, category, description).
- Track status (**Received → Assigned → In Progress → Resolved**).
- Get notifications on updates.
- Provide feedback or reopen issue if unresolved.
- Support/upvote existing issues (prevent duplicates).
- Add supporting photo/details to existing issue.

### Field Workers

- Receive tasks from officers.
- Navigate to issue location.
- Upload before/after photos.
- Update status (**In Progress → Completed**).
- Sync offline submissions when back online.

### Department Officers

- View/verify reported issues (auto-routed by category/location).
- Check for duplicates.
- Prioritize issues (**AI-assisted severity**).
- Assign to field workers.
- Approve/reject completion proof.
- Communicate with citizens (primary reporter only).

### Municipal Admins

- Monitor overall city/ward performance.
- Reassign/escalate overdue issues.
- Access analytics (resolution times, issue density, trends).
- Approve public dashboards for transparency.

---

## 🔑 Must-Have Features (MVP)

- **Issue Reporting** (photo, description, GPS auto-detect, category).
- **Issue Tracking** (status updates + notifications).
- **Duplicate Detection** (location + image/text similarity).
- **Multi-language Support** (English + regional).
- **Geo-Mapping** (heatmaps of issue density).
- **Proof of Work** (before/after photos).
- **Role-Based Dashboards** (citizen, officer, worker, admin).
- **Alternative Access** (SMS/IVR for citizens without smartphones).
- **Offline Mode** (for workers).

---

## 💡 Unique Selling Propositions (USPs)

- **Duplicate Prevention:** Hybrid check → geo-clustering, AI image similarity, text matching.
- **Fair Participation:** Citizens can endorse existing reports & add supporting proof.
- **AI-Assisted Severity:** Example → pothole near hospital > side street.
- **Transparency:** Proof-based resolution, public dashboards.
- **Accessibility:** Multilingual, SMS/IVR support.
- **Data-Driven Governance:** Analytics for trends, ward ranking, efficiency.

---

## 🛠️ Tech Stack (Hackathon Approach)

### Frontend (PWA)

- React.js + Context/Redux.
- PWA features (offline, push notifications).
- Leaflet.js / Google Maps API (geo-tagging, heatmaps).
- Camera/File APIs (photo capture).
- i18n libraries (multilingual).

### Backend

- Node.js + Express.js.
- MongoDB (**GeoJSON + 2dsphere index for location**).
- JWT authentication (role-based).
- Multer/GridFS (for images) or cloud storage (S3/Cloudinary).

### AI / Duplicate Detection

- **Hackathon:** pHash/SSIM (image hashing), text similarity (TF-IDF).
- **Optional APIs:** Google Vision, Azure Vision, Clarifai, Imagga.
- Location proximity via MongoDB `$near`.

### Notifications

- Push: Firebase Cloud Messaging.
- SMS: Twilio / MSG91.

### Analytics / Dashboards

- React + Chart.js / D3.js.
- MongoDB aggregations.
