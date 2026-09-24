# Populate Sanity Data Script for Laval Luxury Homes (Windows Optimized)

Write-Host "Starting real estate data population for Sanity..." -ForegroundColor Gold

function Create-SanityDoc($json) {
    $cmd = "npx"
    $args = @("sanity", "documents", "create", "--replace", $json)
    & $cmd $args
}

# 1. Real Estate Property Types
Write-Host "Adding Real Estate Property Types..."
Create-SanityDoc '{ "_type": "propertyType", "_id": "type-villas", "name": "Villas", "order": 1, "slug": { "_type": "slug", "current": "villas" } }'
Create-SanityDoc '{ "_type": "propertyType", "_id": "type-penthouses", "name": "Penthouses", "order": 2, "slug": { "_type": "slug", "current": "penthouses" } }'
Create-SanityDoc '{ "_type": "propertyType", "_id": "type-estates", "name": "Estates", "order": 3, "slug": { "_type": "slug", "current": "estates" } }'
Create-SanityDoc '{ "_type": "propertyType", "_id": "type-waterfront", "name": "Waterfront", "order": 4, "slug": { "_type": "slug", "current": "waterfront" } }'
Create-SanityDoc '{ "_type": "propertyType", "_id": "type-mansions", "name": "Mansions", "order": 5, "slug": { "_type": "slug", "current": "mansions" } }'
Create-SanityDoc '{ "_type": "propertyType", "_id": "type-townhouses", "name": "Townhouses", "order": 6, "slug": { "_type": "slug", "current": "townhouses" } }'

# 2. Site Settings
Write-Host "Adding Site Settings..."
Create-SanityDoc '{ "_type": "siteSettings", "_id": "siteSettings", "title": "Laval Luxury Homes", "footerText": "© 2026 LAVAL LUXURY HOMES. All rights reserved." }'

Write-Host "Real estate data population complete! Please refresh your Sanity Studio." -ForegroundColor Green
