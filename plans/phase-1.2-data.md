# Phase 1.2 - Data & Content Foundation

## Goal
Populate src/data/agent.json and src/data/properties.json with real content, place images under public/images/, and update architecture docs to document the new mainImage field and the planned edit-view antenna selector.

## Tasks

1. Collect real data from user
   - Agent: name, email, phone, whatsapp, bio, website, avatar filename
   - 2-3 properties: title, description, price (display string), location, features array, status (active/sold/rented), image filenames array, mainImage (one of the image paths)

2. Create data files
   - Write src/data/agent.json with real agent data
   - Write src/data/properties.json with real property data, including mainImage string field on each property

3. Place images
   - Copy agent avatar to public/images/agent/<filename>
   - Create public/images/properties/<slug>/ directories for each property
   - Copy/move property images into matching directories

4. Update docs/architecture.md
   - Add string mainImage "Filename in /public/images/properties/ used as cover in listings" to the PROPERTY erDiagram
   - Add note: future edit-view antenna selector UI will let agent choose the cover image from the gallery

5. Update docs/implementation-plan.md
   - Edit Phase 1.2 checklist to reflect real-data tasks instead of placeholder/sample tasks

## Validation
- src/data/agent.json and src/data/properties.json exist and are valid JSON
- All referenced image paths exist under public/images/
- mainImage values are present and point to existing files
- docs/architecture.md documents mainImage
- docs/implementation-plan.md Phase 1.2 reflects real-data tasks
