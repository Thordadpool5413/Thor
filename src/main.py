import argparse
import json
from dataclasses import dataclass, asdict
from pathlib import Path

DATA_FILE = Path(__file__).parent / "customers.json"

@dataclass
class Customer:
    name: str
    email: str

def load_customers():
    if DATA_FILE.exists():
        with DATA_FILE.open() as f:
            data = json.load(f)
        return [Customer(**c) for c in data]
    return []

def save_customers(customers):
    with DATA_FILE.open('w') as f:
        json.dump([asdict(c) for c in customers], f, indent=2)

def add_customer(name, email):
    customers = load_customers()
    customers.append(Customer(name=name, email=email))
    save_customers(customers)


def list_customers():
    customers = load_customers()
    for c in customers:
        print(f"{c.name} - {c.email}")


def main(argv=None):
    parser = argparse.ArgumentParser(description="Simple CRM")
    subparsers = parser.add_subparsers(dest="command")

    add_parser = subparsers.add_parser("add", help="Add a customer")
    add_parser.add_argument("name")
    add_parser.add_argument("email")

    subparsers.add_parser("list", help="List customers")

    args = parser.parse_args(argv)

    if args.command == "add":
        add_customer(args.name, args.email)
    elif args.command == "list":
        list_customers()
    else:
        parser.print_help()


if __name__ == "__main__":
    main()
