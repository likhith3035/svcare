import os
from PIL import Image, ImageDraw, ImageFont
import qrcode

def build_sample_report():
    bg_path = "public/letterhead-bg.jpg"
    if not os.path.exists(bg_path):
        raise FileNotFoundError(f"Missing {bg_path}")

    img = Image.open(bg_path).convert("RGB")
    draw = ImageDraw.Draw(img)

    # Fonts
    font_bold = lambda sz: ImageFont.truetype("C:\\Windows\\Fonts\\segoeuib.ttf", sz)
    font_reg = lambda sz: ImageFont.truetype("C:\\Windows\\Fonts\\segoeui.ttf", sz)
    font_semibold = lambda sz: ImageFont.truetype("C:\\Windows\\Fonts\\seguisb.ttf", sz)
    font_mono = lambda sz: ImageFont.truetype("C:\\Windows\\Fonts\\consola.ttf", sz)

    # Color palette
    NAVY = (10, 37, 64)
    TEAL = (30, 156, 128)
    TEAL_DARK = (22, 133, 108)
    DARK = (30, 41, 59)
    MUTED = (100, 116, 139)
    LIGHT_BG = (248, 250, 252)
    BORDER_COLOR = (226, 232, 240)
    EMERALD_BG = (209, 250, 229)
    EMERALD_TEXT = (4, 120, 87)
    WHITE = (255, 255, 255)

    left_margin = 110
    right_margin = 1675
    content_width = right_margin - left_margin

    # 1. Report Category Banner
    y = 425
    draw.rounded_rectangle([left_margin, y, right_margin, y + 42], radius=8, fill=(240, 253, 250), outline=(204, 251, 241), width=2)
    draw.text((left_margin + 20, y + 8), "DEPARTMENT OF CLINICAL PATHOLOGY & BIOCHEMISTRY", fill=TEAL_DARK, font=font_bold(22))
    draw.text((right_margin - 380, y + 9), "AUTHENTIC DIGITAL REPORT", fill=NAVY, font=font_bold(20))

    # 2. Patient & Sample Demographics Box
    y = 485
    box_h = 245
    draw.rounded_rectangle([left_margin, y, right_margin, y + box_h], radius=16, fill=LIGHT_BG, outline=BORDER_COLOR, width=2)

    # Left Column: Patient Info
    col1_x = left_margin + 28
    col1_val_x = col1_x + 220
    row_y = y + 20

    labels_col1 = [
        ("Patient Name", "Mr. Ramesh Babu (Sample)"),
        ("Age / Gender", "48 Yrs / Male"),
        ("Referred By", "Self / Dr. Consultation"),
        ("Patient ID / UHID", "SVC-2026-0842"),
        ("Contact No.", "+91 98480 •••••")
    ]
    for lbl, val in labels_col1:
        draw.text((col1_x, row_y), lbl, fill=MUTED, font=font_semibold(21))
        draw.text((col1_x + 190, row_y), ":", fill=MUTED, font=font_bold(21))
        draw.text((col1_val_x, row_y), val, fill=NAVY if "Name" in lbl or "SVC" in val else DARK, font=font_bold(22) if "Name" in lbl else font_semibold(21))
        row_y += 42

    # Divider line
    mid_x = left_margin + 790
    draw.line([(mid_x, y + 16), (mid_x, y + box_h - 16)], fill=BORDER_COLOR, width=2)

    # Right Column: Sample & Booking Info
    col2_x = mid_x + 30
    col2_val_x = col2_x + 220
    row_y = y + 20

    labels_col2 = [
        ("Sample ID", "#B-48192 (Barcoded)"),
        ("Collection Mode", "Doorstep Home Pickup (₹0)"),
        ("Sample Drawn", "06-10-2026, 06:30 AM"),
        ("Report Released", "06-10-2026, 10:45 AM (Same-Day)"),
        ("Sample Type", "Whole Blood / EDTA & Serum")
    ]
    for lbl, val in labels_col2:
        draw.text((col2_x, row_y), lbl, fill=MUTED, font=font_semibold(21))
        draw.text((col2_x + 190, row_y), ":", fill=MUTED, font=font_bold(21))
        draw.text((col2_val_x, row_y), val, fill=TEAL_DARK if "Doorstep" in val or "Same-Day" in val else DARK, font=font_bold(21) if "Doorstep" in val else font_semibold(21))
        row_y += 42

    # 3. Investigation Table Header
    y = 750
    table_hdr_h = 48
    draw.rounded_rectangle([left_margin, y, right_margin, y + table_hdr_h], radius=8, fill=NAVY)
    draw.text((left_margin + 20, y + 10), "TEST INVESTIGATION", fill=WHITE, font=font_bold(20))
    draw.text((left_margin + 620, y + 10), "OBSERVED VALUE", fill=WHITE, font=font_bold(20))
    draw.text((left_margin + 860, y + 10), "UNITS", fill=WHITE, font=font_bold(20))
    draw.text((left_margin + 1040, y + 10), "REFERENCE INTERVAL", fill=WHITE, font=font_bold(20))
    draw.text((left_margin + 1380, y + 10), "STATUS", fill=WHITE, font=font_bold(20))

    # Test Groups Data
    groups = [
        {
            "name": "COMPLETE BLOOD COUNT (CBC) — HEMATOLOGY",
            "tests": [
                ("Hemoglobin (Hb)", "14.6", "g/dL", "13.0 – 17.0", "NORMAL"),
                ("Total WBC Count", "7,400", "cells/cu.mm", "4,000 – 11,000", "NORMAL"),
                ("Platelet Count", "2.65", "Lakhs/cu.mm", "1.50 – 4.50", "NORMAL"),
                ("Packed Cell Volume (PCV)", "43.8", "%", "40.0 – 50.0", "NORMAL"),
            ]
        },
        {
            "name": "DIABETES & METABOLIC BIOCHEMISTRY",
            "tests": [
                ("Fasting Blood Sugar (FBS)", "92", "mg/dL", "70 – 100", "NORMAL"),
                ("HbA1c (Glycated Hemoglobin)", "5.4", "%", "< 5.7 (Non-Diabetic)", "NORMAL"),
                ("Estimated Avg Glucose (eAG)", "108", "mg/dL", "Calculated parameter", "NORMAL"),
            ]
        },
        {
            "name": "RENAL / KIDNEY FUNCTION TESTS (RFT)",
            "tests": [
                ("Serum Creatinine", "0.94", "mg/dL", "0.70 – 1.20", "NORMAL"),
                ("Blood Urea", "24.0", "mg/dL", "15.0 – 40.0", "NORMAL"),
                ("Serum Uric Acid", "5.2", "mg/dL", "3.5 – 7.2", "NORMAL"),
            ]
        },
        {
            "name": "LIPID PROFILE — CARDIOVASCULAR HEALTH",
            "tests": [
                ("Total Cholesterol", "168", "mg/dL", "Desirable: < 200", "NORMAL"),
                ("Serum Triglycerides", "132", "mg/dL", "Normal: < 150", "NORMAL"),
                ("HDL Cholesterol (Good)", "46", "mg/dL", "Normal: > 40", "NORMAL"),
                ("LDL Cholesterol", "96", "mg/dL", "Optimal: < 100", "NORMAL"),
            ]
        }
    ]

    curr_y = y + table_hdr_h + 8

    for grp in groups:
        # Group Header Ribbon
        draw.rounded_rectangle([left_margin, curr_y, right_margin, curr_y + 36], radius=6, fill=(241, 245, 249))
        draw.text((left_margin + 16, curr_y + 6), grp["name"], fill=TEAL_DARK, font=font_bold(19))
        curr_y += 42

        for t_name, t_val, t_unit, t_ref, t_status in grp["tests"]:
            # Row alternating background
            draw.line([(left_margin, curr_y + 36), (right_margin, curr_y + 36)], fill=(241, 245, 249), width=1)
            
            draw.text((left_margin + 20, curr_y + 6), t_name, fill=DARK, font=font_semibold(20))
            draw.text((left_margin + 630, curr_y + 5), t_val, fill=NAVY, font=font_bold(22))
            draw.text((left_margin + 860, curr_y + 7), t_unit, fill=MUTED, font=font_reg(19))
            draw.text((left_margin + 1040, curr_y + 7), t_ref, fill=DARK, font=font_reg(19))

            # Normal Status Pill
            badge_x = left_margin + 1380
            draw.rounded_rectangle([badge_x, curr_y + 4, badge_x + 110, curr_y + 32], radius=6, fill=EMERALD_BG)
            draw.text((badge_x + 18, curr_y + 7), t_status, fill=EMERALD_TEXT, font=font_bold(17))

            curr_y += 39

        curr_y += 8

    # 4. Lab Quality & Assurance Guarantee Box
    curr_y += 10
    callout_h = 90
    draw.rounded_rectangle([left_margin, curr_y, right_margin, curr_y + callout_h], radius=12, fill=(248, 250, 252), outline=BORDER_COLOR, width=2)
    
    # Left check icon text
    draw.text((left_margin + 24, curr_y + 16), "CLINICAL QUALITY ASSURANCE & ACCREDITATION GUARANTEE", fill=NAVY, font=font_bold(19))
    draw.text((left_margin + 24, curr_y + 46), "• Calibrated on fully automated clinical analyzers with daily multi-level QC controls.", fill=MUTED, font=font_reg(17))
    draw.text((left_margin + 780, curr_y + 46), "• ISO 9001:2015 Registered Lab • Certificate #EU/QMS/01326.", fill=MUTED, font=font_reg(17))

    # 5. Signatures and QR Code section
    curr_y += callout_h + 20

    # Generate QR Code
    qr = qrcode.QRCode(box_size=5, border=1)
    qr.add_data("https://svcare.in/verify?report=SVC-2026-0842&cert=EU-QMS-01326")
    qr.make(fit=True)
    qr_img = qr.make_image(fill_color="black", back_color="white").resize((130, 130))
    img.paste(qr_img, (left_margin + 24, curr_y + 5))

    draw.text((left_margin + 175, curr_y + 25), "SCAN TO VERIFY", fill=NAVY, font=font_bold(19))
    draw.text((left_margin + 175, curr_y + 52), "Authentic Digital Record", fill=MUTED, font=font_reg(17))
    draw.text((left_margin + 175, curr_y + 76), "Instant Tamper-Proof Check", fill=TEAL_DARK, font=font_semibold(16))

    # Signatures
    # Signatory 1
    sig1_x = left_margin + 750
    draw.text((sig1_x, curr_y + 20), "K. Chengalrayan, B.Sc, DMLT", fill=(30, 41, 59), font=font_semibold(20))
    draw.text((sig1_x, curr_y + 48), "Senior Medical Lab Technologist", fill=MUTED, font=font_reg(17))
    draw.text((sig1_x, curr_y + 74), "SV Care Health Diagnostics", fill=TEAL_DARK, font=font_bold(16))

    # Signatory 2 (Pathologist)
    sig2_x = right_margin - 380
    draw.text((sig2_x, curr_y + 20), "Dr. M. S., MD (Pathology)", fill=(30, 41, 59), font=font_bold(21))
    draw.text((sig2_x, curr_y + 48), "Consultant Clinical Pathologist", fill=MUTED, font=font_reg(17))
    draw.text((sig2_x, curr_y + 74), "Regd. Medical Practitioner No. 58192", fill=TEAL_DARK, font=font_bold(16))

    # Legal Disclaimer Line
    draw.line([(left_margin, curr_y + 125), (right_margin, curr_y + 125)], fill=BORDER_COLOR, width=1)
    draw.text((left_margin + 20, curr_y + 135), "Note: This diagnostic report is digitally authenticated and valid for all physician consultations, hospital admissions, and insurance records across India.", fill=MUTED, font=font_reg(16))

    # Save high-res report image
    out_path = "public/sample-report.jpg"
    img.save(out_path, quality=95)
    print(f"Successfully generated {out_path} ({img.size[0]}x{img.size[1]})")

    # Save PDF copy for download
    pdf_path = "public/sample-report.pdf"
    img.save(pdf_path, "PDF", resolution=300.0)
    print(f"Successfully generated {pdf_path}")

if __name__ == "__main__":
    build_sample_report()

