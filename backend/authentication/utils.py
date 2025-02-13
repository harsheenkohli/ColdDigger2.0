import csv
import io
from .models import CompanyContact


def process_csv_file(csv_file):
    decoded_file = csv_file.read().decode('utf-8')
    csv_data = csv.DictReader(io.StringIO(decoded_file))

    new_contacts = []
    existing_emails = set()

    for row in csv_data:
        email = row.get('email', '').strip()
        if not email or email in existing_emails:
            continue

        new_contacts.append(CompanyContact(
            name=row.get('name', '').strip(),
            email=email,
            title=row.get('title', '').strip(),
            company=row.get('company', '').strip()
        ))
        existing_emails.add(email)

    if new_contacts:
        CompanyContact.objects.bulk_create(
            new_contacts,
            ignore_conflicts=True  # Skip duplicates
        )

    return len(new_contacts)
