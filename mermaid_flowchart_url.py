import json
import zlib
import base64

mermaid_code = """flowchart TD
  A[Referral received] --> B[Sales/AE delivers core dataset\\npatient + location + decision maker + dx + urgency]
  B --> C[Intake opens referral, timestamps, eligibility check,\\nstarts single patient team thread]
  C --> D{Complete enough to schedule RN eval?}
  D -->|No| E[Intake directs AE for missing essentials\\nAE retrieves + updates thread]
  D -->|Yes| F[RN evaluation scheduled same day when possible]
  E --> F
  F --> G[RN evaluation documents current clinical picture\\nfacts for physician decision]
  G --> H[Physician decision + admission recommendation\\nMD/physician designee/physician IDG member]
  H --> I{Lane}
  I -->|Admit| J[Election statement executed\\nvalid effective date + required content]
  I -->|Defer| K[Targeted missing items assigned\\nAE usually owns retrieval\\nreturn to physician]
  I -->|Not eligible| L[Close referral + document rationale\\nSales communicates to source]
  J --> M[NOE submitted same day when possible\\nBilling verifies acceptance]
  M --> N{NOE accepted?}
  N -->|No| O[Fix rejection + escalate\\nexception workflow if late]
  N -->|Yes| P[Start-of-care visit]
  P --> Q[Rights delivered before care\\nverbal + written + acknowledgment]
  P --> R[RN initial assessment\\nwithin 48 hours after election complete]
  R --> S[IDG comprehensive assessment\\nwithin 5 calendar days]
  S --> T[Plan of care initiated then expanded\\nreview at least every 15 days]
  T --> U[QA 24-hour chart lock\\nrecord contains required artifacts]
  U --> V{Approaching 3rd+ benefit period?}
  V -->|Yes| W[F2F encounter within 30 days prior\\nattestation signed + signature date\\ntelehealth rules screen]
  V -->|No| X[Routine recert cycle]"""

data = {"code": mermaid_code, "mermaid": {"theme": "default"}}
json_str = json.dumps(data)
compressed = zlib.compress(json_str.encode("utf-8"))
base64_encoded = base64.urlsafe_b64encode(compressed).decode("utf-8").rstrip("=")
url = f"https://mermaid.ink/img/pako:{base64_encoded}"

print(url)
