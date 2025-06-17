# Thor

Run the basic CRM application. You can add and list customers:

```bash
# add a customer
python -m src.main add "Alice" alice@example.com

# list customers
python -m src.main list
```

Alternatively install the package and use the `thor` command:

```bash
pip install -e .
thor list
```
