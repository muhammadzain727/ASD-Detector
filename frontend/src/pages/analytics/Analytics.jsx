import React, { useEffect } from 'react';
import $ from 'jquery';
import 'datatables.net';
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS
import L from 'leaflet';
import Papa from 'papaparse';
import './analytics.css'; // Import custom CSS for styling
import { Navbar, Footer } from '../../components';
const Analytics = () => {
    useEffect(() => {
        const countryData = {
            "India": { "lat": 20.5937, "lng": 78.9629, "rate": 29.10 },
            "China": { "lat": 35.8617, "lng": 104.1954, "rate": 35.05 },
            "United States": { "lat": 37.0902, "lng": -95.7129, "rate": 60.34 },
            "Indonesia": { "lat": -0.7893, "lng": 113.9213, "rate": 31.01 },
            "Pakistan": { "lat": 30.3753, "lng": 69.3451, "rate": 31.39 },
            "Nigeria": { "lat": 9.0820, "lng": 8.6753, "rate": 39.45 },
            "Brazil": { "lat": -14.2350, "lng": -51.9253, "rate": 34.59 },
                "Bangladesh": { "lat": 23.6850, "lng": 90.3563, "rate": 29.44 },
                "Russia": { "lat": 61.5240, "lng": 105.3188, "rate": 36.94 },
                "Ethiopia": { "lat": 9.1450, "lng": 40.4897, "rate": 40.89 },
                "Mexico": { "lat": 23.6345, "lng": -102.5528, "rate": 37.04 },
                "Japan": { "lat": 36.2048, "lng": 138.2529, "rate": 60.47 },
                "Philippines": { "lat": 12.8797, "lng": 121.7740, "rate": 32.40 },
                "Egypt": { "lat": 26.8206, "lng": 30.8025, "rate": 29.97 },
                "DR Congo": { "lat": -4.0383, "lng": 21.7587, "rate": 39.84 },
                "Vietnam": { "lat": 14.0583, "lng": 108.2772, "rate": 31.01 },
                "Iran": { "lat": 32.4279, "lng": 53.6880, "rate": 36.82 },
                "Turkey": { "lat": 38.9637, "lng": 35.2433, "rate": 28.66 },
                "Germany": { "lat": 51.1657, "lng": 10.4515, "rate": 52.53 },
                "Thailand": { "lat": 15.8700, "lng": 100.9925, "rate": 29.17 },
                "Tanzania": { "lat": -6.3690, "lng": 34.8888, "rate": 39.89 },
                "United Kingdom": { "lat": 55.3781, "lng": -3.4360, "rate": 70.01 },
                "France": { "lat": 46.6034, "lng": 1.8883, "rate": 42.54 },
                "South Africa": { "lat": -30.5595, "lng": 22.9375, "rate": 37.72 },
                "Italy": { "lat": 41.8719, "lng": 12.5674, "rate": 51.61 },
                "Kenya": { "lat": -0.0236, "lng": 37.9062, "rate": 40.26 },
                "Myanmar": { "lat": 21.9162, "lng": 95.9560, "rate": 30.66 },
                "Colombia": { "lat": 4.5709, "lng": -74.2973, "rate": 33.01 },
                "South Korea": { "lat": 35.9078, "lng": 127.7669, "rate": 50.78 },
                "Uganda": { "lat": 1.3733, "lng": 32.2903, "rate": 41.28 },
                "Sudan": { "lat": 12.8628, "lng": 30.2176, "rate": 30.21 },
                "Spain": { "lat": 40.4637, "lng": -3.7492, "rate": 53.51 },
                "Iraq": { "lat": 33.2232, "lng": 43.6793, "rate": 29.78 },
                "Algeria": { "lat": 28.0339, "lng": 1.6596, "rate": 29.25 },
                "Argentina": { "lat": -38.4161, "lng": -63.6167, "rate": 47.03 },
                "Afghanistan": { "lat": 33.9391, "lng": 67.7100, "rate": 31.14 },
                "Poland": { "lat": 51.9194, "lng": 19.1451, "rate": 34.51 },
                "Canada": { "lat": 56.1304, "lng": -106.3468, "rate": 56.59 },
                "Morocco": { "lat": 31.7917, "lng": -7.0926, "rate": 28.75 },
                "Ukraine": { "lat": 48.3794, "lng": 31.1656, "rate": 34.63 },
                "Angola": { "lat": -11.2027, "lng": 17.8739, "rate": 39.62 },
                "Saudi Arabia": { "lat": 23.8859, "lng": 45.0792, "rate": 31.46 },
                "Uzbekistan": { "lat": 41.3775, "lng": 64.5853, "rate": 38.43 },
                "Yemen": { "lat": 15.5527, "lng": 48.5164, "rate": 30.42 },
                "Mozambique": { "lat": -18.6657, "lng": 35.5296, "rate": 40.13 },
                "Ghana": { "lat": 7.9465, "lng": -1.0232, "rate": 38.72 },
                "Peru": { "lat": -9.1900, "lng": -75.0152, "rate": 34.32 },
                "Malaysia": { "lat": 4.2105, "lng": 101.9758, "rate": 32.46 },
                "Nepal": { "lat": 28.3949, "lng": 84.1240, "rate": 29.52 },
                "Madagascar": { "lat": -18.7669, "lng": 46.8691, "rate": 40.22 },
                "Ivory Coast": { "lat": 7.5400, "lng": -5.5471, "rate": 40.18 },
                "Venezuela": { "lat": 6.4238, "lng": -66.5897, "rate": 31.02 },
                "Cameroon": { "lat": 7.3697, "lng": 12.3547, "rate": 39.55 },
                "Australia": { "lat": -25.2744, "lng": 133.7751, "rate": 44.22 },
                "Niger": { "lat": 17.6078, "lng": 8.0817, "rate": 39.62 },
                "Sri Lanka": { "lat": 7.8731, "lng": 80.7718, "rate": 29.51 },
                "Burkina Faso": { "lat": 12.2383, "lng": -1.5616, "rate": 39.58 },
                "Mali": { "lat": 17.5707, "lng": -3.9962, "rate": 39.63 },
                "Romania": { "lat": 45.9432, "lng": 24.9668, "rate": 35.19 },
                "Malawi": { "lat": -13.2543, "lng": 34.3015, "rate": 39.83 },
                "Chile": { "lat": -35.6751, "lng": -71.5430, "rate": 41.72 },
                "Kazakhstan": { "lat": 48.0196, "lng": 66.9237, "rate": 37.71 },
                "Zambia": { "lat": -13.1339, "lng": 27.8493, "rate": 39.77 },
                "Guatemala": { "lat": 15.7835, "lng": -90.2308, "rate": 33.73 },
                "Ecuador": { "lat": -1.8312, "lng": -78.1834, "rate": 34.33 },
                "Syria": { "lat": 34.8021, "lng": 38.9968, "rate": 30.10 },
                "Netherlands": { "lat": 52.1326, "lng": 5.2913, "rate": 53.74 },
                "Senegal": { "lat": 14.4974, "lng": -14.4524, "rate": 39.29 },
                "Cambodia": { "lat": 12.5657, "lng": 104.9910, "rate": 30.75 },
                "Chad": { "lat": 15.4542, "lng": 18.7322, "rate": 39.64 },
                "Somalia": { "lat": 5.1521, "lng": 46.1996, "rate": 39.87 },
                "Zimbabwe": { "lat": -19.0154, "lng": 29.1549, "rate": 39.80 },
                "Guinea": { "lat": 9.9456, "lng": -9.6966, "rate": 39.65 },
                "Rwanda": { "lat": -1.9403, "lng": 29.8739, "rate": 40.01 },
                "Benin": { "lat": 9.3077, "lng": 2.3158, "rate": 39.66 },
                "Burundi": { "lat": -3.3731, "lng": 29.9189, "rate": 40.05 },
                "Tunisia": { "lat": 33.8869, "lng": 9.5375, "rate": 29.01 },
                "Bolivia": { "lat": -16.2902, "lng": -63.5887, "rate": 34.28 },
                "Belgium": { "lat": 50.8503, "lng": 4.3517, "rate": 53.12 },
                "Haiti": { "lat": 18.9712, "lng": -72.2852, "rate": 33.91 },
                "Cuba": { "lat": 21.5218, "lng": -77.7812, "rate": 33.43 },
                "South Sudan": { "lat": 6.8770, "lng": 31.3070, "rate": 30.63 },
                "Dominican Republic": { "lat": 18.7357, "lng": -70.1627, "rate": 33.38 },
                "Czech Republic": { "lat": 49.8175, "lng": 15.4730, "rate": 36.55 },
                "Greece": { "lat": 39.0742, "lng": 21.8243, "rate": 37.85 },
                "Jordan": { "lat": 30.5852, "lng": 36.2384, "rate": 30.12 },
                "Portugal": { "lat": 39.3999, "lng": -8.2245, "rate": 53.91 },
                "Azerbaijan": { "lat": 40.1431, "lng": 47.5769, "rate": 36.21 },
                "Sweden": { "lat": 60.1282, "lng": 18.6435, "rate": 53.23 },
                "Honduras": { "lat": 15.2000, "lng": -86.2419, "rate": 33.62 },
                "United Arab Emirates": { "lat": 23.4241, "lng": 53.8478, "rate": 32.30 },
                "Hungary": { "lat": 47.1625, "lng": 19.5033, "rate": 36.41 },
                "Tajikistan": { "lat": 38.8610, "lng": 71.2761, "rate": 38.46 },
                "Belarus": { "lat": 53.7098, "lng": 27.9534, "rate": 37.15 },
                "Austria": { "lat": 47.5162, "lng": 14.5501, "rate": 52.83 },
                "Papua New Guinea": { "lat": -6.314993, "lng": 143.95555, "rate": 30.22 },
                "Serbia": { "lat": 44.0165, "lng": 21.0059, "rate": 35.40 },
                "Switzerland": { "lat": 46.8182, "lng": 8.2275, "rate": 53.15 },
                "Israel": { "lat": 31.0461, "lng": 34.8516, "rate": 52.89 },
                "Togo": { "lat": 8.6195, "lng": 0.8248, "rate": 39.68 },
                "Sierra Leone": { "lat": 8.4606, "lng": -11.7799, "rate": 39.75 },
                "Hong Kong": { "lat": 22.3193, "lng": 114.1694, "rate": 37.06 },
                "Laos": { "lat": 19.8563, "lng": 102.4955, "rate": 30.61 },
                "Paraguay": { "lat": -23.4425, "lng": -58.4438, "rate": 34.35 },
                "Bulgaria": { "lat": 42.7339, "lng": 25.4858, "rate": 36.44 },
                "Libya": { "lat": 26.3351, "lng": 17.2283, "rate": 30.14 },
                "Lebanon": { "lat": 33.8547, "lng": 35.8623, "rate": 30.05 },
                "Nicaragua": { "lat": 12.8654, "lng": -85.2072, "rate": 33.61 },
                "Kyrgyzstan": { "lat": 41.2044, "lng": 74.7661, "rate": 38.45 },
                "El Salvador": { "lat": 13.7942, "lng": -88.8965, "rate": 33.64 },
                "Turkmenistan": { "lat": 38.9697, "lng": 59.5563, "rate": 38.44 },
                "Singapore": { "lat": 1.3521, "lng": 103.8198, "rate": 49.55 },
                "Denmark": { "lat": 56.2639, "lng": 9.5018, "rate": 53.13 },
                "Finland": { "lat": 61.9241, "lng": 25.7482, "rate": 53.22 },
                "Slovakia": { "lat": 48.6690, "lng": 19.6990, "rate": 36.54 },
                "Norway": { "lat": 60.4720, "lng": 8.4689, "rate": 45.79 },
                "New Zealand": { "lat": -40.9006, "lng": 174.8860, "rate": 44.27 },
                "Ireland": { "lat": 53.4129, "lng": -8.2439, "rate": 52.79 },
                "Central African Republic": { "lat": 6.6111, "lng": 20.9394, "rate": 39.71 },
                "Costa Rica": { "lat": 9.7489, "lng": -83.7534, "rate": 34.36 },
                "Palestine": { "lat": 31.9474, "lng": 35.2272, "rate": 30.25 },
                "Oman": { "lat": 21.5126, "lng": 55.9233, "rate": 32.51 },
                "Liberia": { "lat": 6.4281, "lng": -9.4295, "rate": 39.81 },
                "Mauritania": { "lat": 21.0079, "lng": -10.9408, "rate": 39.56 },
                "Panama": { "lat": 8.5380, "lng": -80.7821, "rate": 33.34 },
                "Kuwait": { "lat": 29.3117, "lng": 47.4818, "rate": 31.57 },
                "Croatia": { "lat": 45.1000, "lng": 15.2000, "rate": 36.57 },
                "Moldova": { "lat": 47.4116, "lng": 28.3699, "rate": 35.22 },
                "Georgia": { "lat": 42.3154, "lng": 43.3569, "rate": 36.35 },
                "Eritrea": { "lat": 15.1794, "lng": 39.7823, "rate": 29.66 },
                "Uruguay": { "lat": -32.5228, "lng": -55.7658, "rate": 46.94 },
                "Bosnia and Herzegovina": { "lat": 43.9159, "lng": 17.6791, "rate": 35.31 },
                "Mongolia": { "lat": 46.8625, "lng": 103.8467, "rate": 36.81 },
                "Armenia": { "lat": 40.0691, "lng": 45.0382, "rate": 36.19 },
                "Jamaica": { "lat": 18.1096, "lng": -77.2975, "rate": 32.14 },
                "Qatar": { "lat": 25.3548, "lng": 51.1839, "rate": 32.18 },
                "Albania": { "lat": 41.1533, "lng": 20.1683, "rate": 35.53 },
                "Lithuania": { "lat": 55.1694, "lng": 23.8813, "rate": 36.71 },
                "Namibia": { "lat": -22.9576, "lng": 18.4904, "rate": 39.67 },
                "Botswana": { "lat": -22.3285, "lng": 24.6849, "rate": 39.70 },
                "Gambia": { "lat": 13.4432, "lng": -15.3101, "rate": 39.59 },
                "Gabon": { "lat": -0.8037, "lng": 11.6094, "rate": 39.61 },
                "Lesotho": { "lat": -29.6105, "lng": 28.2336, "rate": 39.69 },
                "North Macedonia": { "lat": 41.6086, "lng": 21.7453, "rate": 35.42 },
                "Slovenia": { "lat": 46.1512, "lng": 14.9955, "rate": 36.56 },
                "Guinea-Bissau": { "lat": 11.8037, "lng": -15.1804, "rate": 39.66 },
                "Latvia": { "lat": 56.8796, "lng": 24.6032, "rate": 36.61 },
                "Bahrain": { "lat": 26.0667, "lng": 50.5577, "rate": 32.16 },
                "Trinidad and Tobago": { "lat": 10.6918, "lng": -61.2225, "rate": 32.10 },
                "Estonia": { "lat": 58.5953, "lng": 25.0136, "rate": 36.54 },
                "Timor-Leste": { "lat": -8.8742, "lng": 125.7275, "rate": 30.20 },
                "Mauritius": { "lat": -20.3484, "lng": 57.5522, "rate": 32.54 },
                "Cyprus": { "lat": 35.1264, "lng": 33.4299, "rate": 36.48 },
                "Eswatini": { "lat": -26.5225, "lng": 31.4659, "rate": 39.71 },
                "Djibouti": { "lat": 11.8251, "lng": 42.5903, "rate": 39.82 },
                "Fiji": { "lat": -17.7134, "lng": 178.0650, "rate": 30.23 },
                "Comoros": { "lat": -11.8750, "lng": 43.8722, "rate": 30.28 },
                "Guyana": { "lat": 4.8604, "lng": -58.9302, "rate": 33.20 },
                "Bhutan": { "lat": 27.5142, "lng": 90.4336, "rate": 29.55 },
                "Solomon Islands": { "lat": -9.6457, "lng": 160.1562, "rate": 30.27 },
                "Luxembourg": { "lat": 49.8153, "lng": 6.1296, "rate": 53.51 },
                "Montenegro": { "lat": 42.7087, "lng": 19.3744, "rate": 35.37 },
                "Suriname": { "lat": 3.9193, "lng": -56.0278, "rate": 33.44 },
                "Cabo Verde": { "lat": 16.5388, "lng": -23.0418, "rate": 30.24 },
                "Micronesia": { "lat": 7.4256, "lng": 150.5508, "rate": 30.29 },
                "Malta": { "lat": 35.9375, "lng": 14.3754, "rate": 36.33 },
                "Brunei": { "lat": 4.5353, "lng": 114.7277, "rate": 32.52 },
                "Bahamas": { "lat": 25.0343, "lng": -77.3963, "rate": 33.19 },
                "Belize": { "lat": 17.1899, "lng": -88.4976, "rate": 33.55 },
                "Iceland": { "lat": 64.9631, "lng": -19.0208, "rate": 53.35 },
                "Barbados": { "lat": 13.1939, "lng": -59.5432, "rate": 33.43 },
                "Samoa": { "lat": -13.7590, "lng": -172.1046, "rate": 30.26 },
                "Saint Lucia": { "lat": 13.9094, "lng": -60.9789, "rate": 33.21 },
                "Kiribati": { "lat": -3.3704, "lng": -168.7340, "rate": 30.22 },
                "Grenada": { "lat": 12.1165, "lng": -61.6790, "rate": 33.18 },
                "Tonga": { "lat": -21.1790, "lng": -175.1982, "rate": 30.25 },
                "Seychelles": { "lat": -4.6796, "lng": 55.4920, "rate": 30.28 },
                "Andorra": { "lat": 42.5063, "lng": 1.5218, "rate": 53.50 },
                "Dominica": { "lat": 15.4150, "lng": -61.3710, "rate": 33.16 },
                "Antigua and Barbuda": { "lat": 17.0608, "lng": -61.7964, "rate": 33.20 },
                "Saint Vincent and the Grenadines": { "lat": 12.9843, "lng": -61.2872, "rate": 33.22 },
                "San Marino": { "lat": 43.9424, "lng": 12.4578, "rate": 53.47 },
                "Vanuatu": { "lat": -15.3767, "lng": 166.9592, "rate": 30.23 },
                "Monaco": { "lat": 43.7384, "lng": 7.4246, "rate": 53.48 },
                "Liechtenstein": { "lat": 47.1660, "lng": 9.5554, "rate": 53.52 }
            // Add more countries as needed
        };

        const table = $('#data-table').DataTable();

        // Populate the table with data
        for (const country in countryData) {
            const data = countryData[country];
            table.row.add([country, data.rate]).draw();
        }

        // Initialize the map
        const map = L.map('map').setView([20, 0], 2);

        // Set up the OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
        }).addTo(map);

        // Function to handle marker click and highlight table row
        const highlightCountry = (country) => {
            const table = $('#data-table').DataTable();
            const rowIndex = table.rows().eq(0).filter((rowIdx) => {
                return table.cell(rowIdx, 0).data() === country;
            });
            table.rows().nodes().to$().removeClass('highlight');
            $(table.row(rowIndex).node()).addClass('highlight');
            $('html, body').animate({
                scrollTop: $('#data-table').offset().top + (rowIndex[0] * $('#data-table tbody tr').height())
            }, 1000);
        };

        // Add markers for each country
        for (const country in countryData) {
            const data = countryData[country];
            const marker = L.marker([data.lat, data.lng])
                .addTo(map)
                .bindPopup(`<b>${country}</b><br>Autism Rate: ${data.rate}%`)
                .on('click', function (e) {
                    const countryName = this.getPopup().getContent().split('<br>')[0].replace('<b>', '').replace('</b>', '');
                    highlightCountry(countryName);
                    this.setIcon(L.icon({ iconUrl: "/images/stars.png" })); // Change marker icon on click
                });
        }

        // CSS to highlight the selected row
        const style = $('<style>.highlight { background-color: #ffeb3b !important; }</style>');
        $('html > head').append(style);

        return () => {
            // Clean up any resources (if needed) when component unmounts
            map.remove();
            table.destroy();
        };
    }, []);
    return (
        <>
        <Navbar />
        <div className="analytics-container">
            <h1>Autism Rates by Country</h1>
            <div id="map" className="map-container"></div>
            <table id="data-table" className="display">
                <thead>
                    <tr>
                        <th>Country</th>
                        <th>Autism Rate (%)</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Data will be populated dynamically */}
                </tbody>
            </table>
        </div>
        <Footer />
        </>
    );
};

export default Analytics;
