        // Check authentication on page load
        function checkAuth() {
            const isLoggedIn = sessionStorage.getItem('isLoggedIn');
            if (isLoggedIn !== 'true') {
                // Redirect to main page if not logged in
                window.location.href = '../';
                return;
            }
            // Set today's date as default
            document.getElementById('voucherDate').valueAsDate = new Date();
        }
        
        // Logout function
        function logout() {
            sessionStorage.removeItem('isLoggedIn');
            window.location.href = '../';
        }
        
        // Initialize authentication check on page load
        window.addEventListener('load', checkAuth);
        
        // Add row functions
        function addPaxRow() {
            const tbody = document.querySelector('#paxTable tbody');
            const newRow = tbody.rows[0].cloneNode(true);
            // Clear input values
            newRow.querySelectorAll('input').forEach(input => {
                if (input.type === 'checkbox') {
                    input.checked = false;
                } else {
                    input.value = '';
                }
            });
            tbody.appendChild(newRow);
        }
        
        function addFlightRow() {
            const tbody = document.querySelector('#flightTable tbody');
            const newRow = tbody.rows[0].cloneNode(true);
            newRow.querySelectorAll('input').forEach(input => input.value = '');
            tbody.appendChild(newRow);
        }
        
        function addAccommodationRow() {
            const tbody = document.querySelector('#accommodationTable tbody');
            const newRow = tbody.rows[0].cloneNode(true);
            newRow.querySelectorAll('input').forEach(input => input.value = '');
            tbody.appendChild(newRow);
        }
        
        function addContactRow() {
            const tbody = document.querySelector('#contactTable tbody');
            const newRow = tbody.rows[0].cloneNode(true);
            newRow.querySelectorAll('input').forEach(input => input.value = '');
            tbody.appendChild(newRow);
        }
        
        function removeRow(button) {
            const row = button.closest('tr');
            const tbody = row.parentNode;
            if (tbody.rows.length > 1) {
                row.remove();
            } else {
                alert('At least one row is required.');
            }
        }
        
        function previewVoucher() {
            const voucherNo = document.getElementById('voucherNo').value;
            const voucherDate = document.getElementById('voucherDate').value;
            
            if (!voucherNo || !voucherDate) {
                alert('Please fill in Voucher No and Date');
                return;
            }
            
            // Update preview header
            document.getElementById('previewVoucherNo').textContent = voucherNo;
            document.getElementById('previewDate').textContent = new Date(voucherDate).toLocaleDateString();
            
            let previewHTML = '';
            
            // Pax Details
            previewHTML += '<h5>Pax(es) Details</h5>';
            previewHTML += '<table class="voucher-table"><thead><tr><th>Passport No.</th><th>Pax Name</th><th>With Bed</th><th>With Transport</th><th>With Ziarat</th><th>With Food</th></tr></thead><tbody>';
            
            const paxRows = document.querySelectorAll('#paxTable tbody tr');
            paxRows.forEach(row => {
                const inputs = row.querySelectorAll('input');
                if (inputs[0].value || inputs[1].value) {
                    previewHTML += '<tr>';
                    previewHTML += `<td>${inputs[0].value}</td>`;
                    previewHTML += `<td>${inputs[1].value}</td>`;
                    previewHTML += `<td>${inputs[2].checked ? '✓' : '×'}</td>`;
                    previewHTML += `<td>${inputs[3].checked ? '✓' : '×'}</td>`;
                    previewHTML += `<td>${inputs[4].checked ? '✓' : '×'}</td>`;
                    previewHTML += `<td>${inputs[5].checked ? '✓' : '×'}</td>`;
                    previewHTML += '</tr>';
                }
            });
            previewHTML += '</tbody></table>';
            
            // Flight Details
            previewHTML += '<h5 class="mt-4">Flight Details</h5>';
            previewHTML += '<table class="voucher-table"><thead><tr><th>Airline</th><th>Flight No.</th><th>Sector</th><th>Flight Date</th><th>Departure</th><th>Arrival</th></tr></thead><tbody>';
            
            const flightRows = document.querySelectorAll('#flightTable tbody tr');
            flightRows.forEach(row => {
                const inputs = row.querySelectorAll('input');
                if (inputs[0].value || inputs[1].value) {
                    previewHTML += '<tr>';
                    previewHTML += `<td>${inputs[0].value}</td>`;
                    previewHTML += `<td>${inputs[1].value}</td>`;
                    previewHTML += `<td>${inputs[2].value}</td>`;
                    previewHTML += `<td>${inputs[3].value}</td>`;
                    previewHTML += `<td>${inputs[4].value}</td>`;
                    previewHTML += `<td>${inputs[5].value}</td>`;
                    previewHTML += '</tr>';
                }
            });
            previewHTML += '</tbody></table>';
            
            // Accommodation Details
            previewHTML += '<h5 class="mt-4">Accommodation Details</h5>';
            previewHTML += '<table class="voucher-table"><thead><tr><th>City</th><th>Hotel Name</th><th>Confirmation Number</th><th>Check-In</th><th>Check-Out</th><th>Nights</th><th>Room</th></tr></thead><tbody>';
            
            const accommodationRows = document.querySelectorAll('#accommodationTable tbody tr');
            accommodationRows.forEach(row => {
                const inputs = row.querySelectorAll('input');
                if (inputs[0].value || inputs[1].value) {
                    previewHTML += '<tr>';
                    previewHTML += `<td>${inputs[0].value}</td>`;
                    previewHTML += `<td>${inputs[1].value}</td>`;
                    previewHTML += `<td>${inputs[2].value}</td>`;
                    previewHTML += `<td>${inputs[3].value}</td>`;
                    previewHTML += `<td>${inputs[4].value}</td>`;
                    previewHTML += `<td>${inputs[5].value}</td>`;
                    previewHTML += `<td>${inputs[6].value}</td>`;
                    previewHTML += '</tr>';
                }
            });
            previewHTML += '</tbody></table>';
            
            // Contact Details
            previewHTML += '<h5 class="mt-4">Contact Details</h5>';
            previewHTML += '<table class="voucher-table"><thead><tr><th>Name</th><th>Contact Number</th></tr></thead><tbody>';
            const contactRows = document.querySelectorAll('#contactTable tbody tr');
            let hasContactData = false;
            contactRows.forEach(row => {
                const inputs = row.querySelectorAll('input');
                if (inputs[0].value || inputs[1].value) {
                    hasContactData = true;
                    previewHTML += '<tr>';
                    previewHTML += `<td>${inputs[0].value}</td>`;
                    previewHTML += `<td>${inputs[1].value}</td>`;
                    previewHTML += '</tr>';
                }
            });
            if (!hasContactData) {
                previewHTML += '<tr><td colspan="2">No contact details entered</td></tr>';
            }
            previewHTML += '</tbody></table>';
            
            // Remarks
            const remarks = document.getElementById('remarks').value;
            if (remarks) {
                previewHTML += '<h5 class="mt-4">Remarks</h5>';
                previewHTML += `<p>${remarks}</p>`;
            }
            
            document.getElementById('previewContent').innerHTML = previewHTML;
            document.getElementById('voucherPreview').style.display = 'block';
            
            // Scroll to preview
            document.getElementById('voucherPreview').scrollIntoView({ behavior: 'smooth' });
        }
        
        function downloadPDF() {
            const voucherNo = document.getElementById('voucherNo').value;
            const voucherDate = document.getElementById('voucherDate').value;
            
            if (!voucherNo || !voucherDate) {
                alert('Please fill in Voucher No and Date first, then preview the voucher');
                return;
            }

            // Create PDF content with logo
            let pdfHTML = `
                <div class="pdf-header" style="display: flex; align-items: center; justify-content: center; gap: 16px; position: relative;">
                    <img src="../pics/logo.png" alt="Company Logo" class="pdf-logo" style="height: 60px; margin-right: 16px; position: absolute; left: 0;" onerror="this.style.display='none';">
                    <h1 style="margin: 0 auto; font-size: 1.6em; text-align: center; width: 100%;">AL-ZAHID MADNI TRAVELS (PVT) LTD.</h1>
                </div>
                <div class="pdf-info">
                    <span>Voucher No: ${voucherNo}</span>
                    <span>Date: ${(() => {
                        const d = new Date(voucherDate);
                        const day = String(d.getDate()).padStart(2, '0');
                        const month = String(d.getMonth() + 1).padStart(2, '0');
                        const year = d.getFullYear();
                        return `${day}/${month}/${year}`;
                    })()}</span>
                </div>
            `;        
            // Add Pax Details        
            pdfHTML += '<div class="pdf-section-title">Pax(es) Details</div>';        pdfHTML += '<table class="pdf-table"><thead><tr><th>Passport No.</th><th>Pax Name</th><th>With Bed</th><th>With Transport</th><th>With Ziarat</th><th>With Food</th></tr></thead><tbody>';
            
            const paxRows = document.querySelectorAll('#paxTable tbody tr');
            let hasPaxData = false;
            paxRows.forEach(row => {
                const inputs = row.querySelectorAll('input');
                if (inputs[0].value || inputs[1].value) {
                    hasPaxData = true;
                    pdfHTML += '<tr>';
                    pdfHTML += `<td>${inputs[0].value || '-'}</td>`;
                    pdfHTML += `<td>${inputs[1].value || '-'}</td>`;
                    pdfHTML += `<td>${inputs[2].checked ? '✓' : '×'}</td>`;
                    pdfHTML += `<td>${inputs[3].checked ? '✓' : '×'}</td>`;
                    pdfHTML += `<td>${inputs[4].checked ? '✓' : '×'}</td>`;
                    pdfHTML += `<td>${inputs[5].checked ? '✓' : '×'}</td>`;
                    pdfHTML += '</tr>';
                }
            });
            if (!hasPaxData) {
                pdfHTML += '<tr><td colspan="6">No passenger details entered</td></tr>';
            }
            pdfHTML += '</tbody></table>';

            // Add Flight Details
            pdfHTML += '<div class="pdf-section-title">Flight Details</div>';
            pdfHTML += '<table class="pdf-table"><thead><tr><th>Airline</th><th>Flight No.</th><th>Sector</th><th>Flight Date</th><th>Departure</th><th>Arrival</th></tr></thead><tbody>';
            
            const flightRows = document.querySelectorAll('#flightTable tbody tr');
            let hasFlightData = false;
            flightRows.forEach(row => {
                const inputs = row.querySelectorAll('input');
                if (inputs[0].value || inputs[1].value) {
                    hasFlightData = true;
                    pdfHTML += '<tr>';
                    pdfHTML += `<td>${inputs[0].value || '-'}</td>`;
                    pdfHTML += `<td>${inputs[1].value || '-'}</td>`;
                    pdfHTML += `<td>${inputs[2].value || '-'}</td>`;
                    pdfHTML += `<td>${inputs[3].value || '-'}</td>`;
                    pdfHTML += `<td>${inputs[4].value || '-'}</td>`;
                    pdfHTML += `<td>${inputs[5].value || '-'}</td>`;
                    pdfHTML += '</tr>';
                }
            });
            if (!hasFlightData) {
                pdfHTML += '<tr><td colspan="6">No flight details entered</td></tr>';
            }
            pdfHTML += '</tbody></table>';

            // Add Accommodation Details
            pdfHTML += '<div class="pdf-section-title">Accommodation Details</div>';
            pdfHTML += '<table class="pdf-table"><thead><tr><th>City</th><th>Hotel Name</th><th>Confirmation Number</th><th>Check-In</th><th>Check-Out</th><th>Nights</th><th>Room</th></tr></thead><tbody>';
            
            const accommodationRows = document.querySelectorAll('#accommodationTable tbody tr');
            let hasAccommodationData = false;
            accommodationRows.forEach(row => {
                const inputs = row.querySelectorAll('input');
                if (inputs[0].value || inputs[1].value) {
                    hasAccommodationData = true;
                    pdfHTML += '<tr>';
                    pdfHTML += `<td>${inputs[0].value || '-'}</td>`;
                    pdfHTML += `<td>${inputs[1].value || '-'}</td>`;
                    pdfHTML += `<td>${inputs[2].value || '-'}</td>`;
                    pdfHTML += `<td>${inputs[3].value || '-'}</td>`;
                    pdfHTML += `<td>${inputs[4].value || '-'}</td>`;
                    pdfHTML += `<td>${inputs[5].value || '-'}</td>`;
                    pdfHTML += `<td>${inputs[6].value || '-'}</td>`;
                    pdfHTML += '</tr>';
                }
            });
            if (!hasAccommodationData) {
                pdfHTML += '<tr><td colspan="7">No accommodation details entered</td></tr>';
            }
            pdfHTML += '</tbody></table>';

            // Add Contact Details
            pdfHTML += '<div class="pdf-section-title">Contact Details</div>';
            pdfHTML += '<table class="pdf-table"><thead><tr><th>Name</th><th>Contact Number</th></tr></thead><tbody>';
            const contactRows = document.querySelectorAll('#contactTable tbody tr');
            let hasContactData = false;
            contactRows.forEach(row => {
                const inputs = row.querySelectorAll('input');
                if (inputs[0].value || inputs[1].value) {
                    hasContactData = true;
                    pdfHTML += '<tr>';
                    pdfHTML += `<td>${inputs[0].value || '-'}</td>`;
                    pdfHTML += `<td>${inputs[1].value || '-'}</td>`;
                    pdfHTML += '</tr>';
                }
            });
            if (!hasContactData) {
                pdfHTML += '<tr><td colspan="2">No contact details entered</td></tr>';
            }
            pdfHTML += '</tbody></table>';

            // Add Remarks
            const remarks = document.getElementById('remarks').value;
            if (remarks) {
                pdfHTML += '<div class="pdf-section-title">Remarks</div>';
                pdfHTML += `<p>${remarks}</p>`;
            }

            // Add Terms and Conditions
            pdfHTML += '<div class="pdf-section-title">Terms and Conditions</div>';
            pdfHTML += `<ol style="font-size: 9px; line-height: 1.3;">
                <li>I will abide by the details of this agreement as per the requirements, guidance, and regulations of the Ministry of Hajj & Umrah of the KSA.</li>
                <li>In the event of my non-compliance with this package and should I overstay, I submit myself to the laid-down procedure of KSA.</li>
                <li>In case of emergency, I shall report the matter to the service provider whose address in Makkah, Madinah, and Jeddah has been known to me.</li>
                <li>That I will depart the Kingdom on completion of my package as per program & visa and will not overstay under any circumstances.</li>
                <li>That I will not take up employment with or without pay.</li>
                <li>It is not permitted for anyone to sleep or camp (with or without luggage) around the Holy sites; anyone apprehended by MOH will have to pay the fine and cost of accommodation. MOH will then release the passport.</li>
                <li>Children under 10 years will share a bed with parents.</li>
                <li>The company will not be held responsible for any service that is not mentioned on the voucher.</li>
            </ol>`;

            // Add Footer with contact information
            pdfHTML += `
                <div class="pdf-footer">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <p><strong>Received By ____________________</strong></p>
                            <small>Copyright © 2025. All rights reserved.</small>
                        </div>
                        <div style="text-align: right; font-size: 9px; line-height: 1.2;">
                            <div><strong>Ph#:</strong> 0300-9666476</div>
                            <div><strong>Email:</strong> info@alzahidmadni.com</div>
                            <div><strong>Website:</strong> alzahidmadni.com</div>
                        </div>
                    </div>
                </div>
            `;

            // Set the PDF container content
            const pdfContainer = document.getElementById('pdfContainer');
            pdfContainer.innerHTML = pdfHTML;
            pdfContainer.style.display = 'block';

            // Generate PDF using html2canvas and jsPDF
            html2canvas(pdfContainer, {
                scale: 2,
                useCORS: true,
                allowTaint: true,
                backgroundColor: '#ffffff',
                width: 794,
                height: 1123
            }).then(canvas => {
                const imgData = canvas.toDataURL('image/png');
                const { jsPDF } = window.jspdf;
                const pdf = new jsPDF('p', 'mm', 'a4');
                
                const imgWidth = 210;
                const pageHeight = 295;
                const imgHeight = (canvas.height * imgWidth) / canvas.width;
                let heightLeft = imgHeight;
                let position = 0;

                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;

                while (heightLeft >= 0) {
                    position = heightLeft - imgHeight;
                    pdf.addPage();
                    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                    heightLeft -= pageHeight;
                }

                pdf.save(`Al_Zahid_Madni_Travels_Voucher_${voucherNo}.pdf`);
                
                // Hide the PDF container
                pdfContainer.style.display = 'none';
            }).catch(error => {
                console.error('PDF generation failed:', error);
                alert('PDF generation failed. Please try again.');
                pdfContainer.style.display = 'none';
            });
        }

// Add event listeners for new buttons
window.addEventListener('DOMContentLoaded', function() {
    document.getElementById('addVoucherBtn').addEventListener('click', addVoucher);
    document.getElementById('previewVoucherBtn').addEventListener('click', previewVoucher);
    document.getElementById('downloadVoucherBtn').addEventListener('click', downloadPDF);
});

async function addVoucher() {
    // Collect form data
    const voucherNo = document.getElementById('voucherNo').value;
    const voucherDate = document.getElementById('voucherDate').value;
    if (!voucherNo || !voucherDate) {
        alert('Please fill in Voucher No and Date');
        return;
    }
    // Pax Details
    const paxRows = document.querySelectorAll('#paxTable tbody tr');
    let pax = null;
    for (const row of paxRows) {
        const inputs = row.querySelectorAll('input');
        if (inputs[0].value || inputs[1].value) {
            pax = {
                voucherNo,
                passportNo: inputs[0].value,
                name: inputs[1].value,
                withBed: inputs[2].checked,
                withTransport: inputs[3].checked,
                withZiarat: inputs[4].checked,
                food: inputs[5].checked ? 'Yes' : 'No',
                flightDetails: [],
                accommodationDetails: [],
                contactDetails: []
            };
            break; // Only first pax for now
        }
    }
    if (!pax) {
        alert('Please enter at least one Pax detail.');
        return;
    }
    // Flight Details
    const flightRows = document.querySelectorAll('#flightTable tbody tr');
    for (const row of flightRows) {
        const inputs = row.querySelectorAll('input');
        if (inputs[0].value || inputs[1].value) {
            pax.flightDetails.push({
                airline: inputs[0].value,
                flightNo: inputs[1].value,
                sector: inputs[2].value,
                flightDate: inputs[3].value,
                departureTime: inputs[4].value,
                arrivalTime: inputs[5].value
            });
        }
    }
    // Accommodation Details
    const accommodationRows = document.querySelectorAll('#accommodationTable tbody tr');
    for (const row of accommodationRows) {
        const inputs = row.querySelectorAll('input');
        if (inputs[0].value || inputs[1].value) {
            pax.accommodationDetails.push({
                city: inputs[0].value,
                hotelName: inputs[1].value,
                confirmationNumber: inputs[2].value,
                checkIn: inputs[3].value,
                checkOut: inputs[4].value,
                nights: inputs[5].value,
                roomType: inputs[6].value
            });
        }
    }
    // Contact Details
    const contactRows = document.querySelectorAll('#contactTable tbody tr');
    for (const row of contactRows) {
        const inputs = row.querySelectorAll('input');
        if (inputs[0].value || inputs[1].value) {
            pax.contactDetails.push({
                name: inputs[0].value,
                contactNumber: inputs[1].value
            });
        }
    }
    // POST to backend
    try {
        const res = await fetch('http://localhost:8001/api/paxes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(pax)
        });
        const data = await res.json();
        if (res.ok) {
            alert('Voucher added successfully!');
        } else {
            alert('Error: ' + (data.msg || 'Failed to add voucher'));
        }
    } catch (err) {
        alert('Error: ' + err.message);
    }
}