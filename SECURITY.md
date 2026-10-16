# APERTURE — Security Policy

## Scope

APERTURE is currently in early development and is not deployed for public use. It is a client-side-only educational prototype with no backend, no user accounts, no authentication, and no personal data storage.

The scope of this security policy reflects the current state of the project. It will be updated as new capabilities are added.

---

## Reporting a Vulnerability

If you discover a security vulnerability in APERTURE, please report it responsibly.

**Do not post vulnerability details in a public GitHub issue, pull request or discussion.**

1. Open the repository's **Security** tab and look for **Report a vulnerability**. If GitHub private vulnerability reporting is enabled for this repository, use it; the report is visible only to the maintainers. (Whether it is enabled has not been verified for this repository.)
2. If that option is not available, open a public issue that says only that you have a security concern and asks for a private contact channel. Do not include technical details, proof-of-concept code or sensitive data in that issue.

A security report should include:
- A clear description of the vulnerability
- The component or file affected
- Steps to reproduce the issue
- The potential impact if the vulnerability were exploited
- Any suggested remediation, if known

There is no established SLA for response time at this stage of the project. Reports will be reviewed and acknowledged as promptly as circumstances allow.

---

## What to Report

Given the current architecture (client-side only, no user data, no authentication), the most relevant security issues are:

- Secrets, API keys, credentials, or tokens committed to the repository or present in source files
- Dependency vulnerabilities with a credible exploitation path in this application's context
- Cross-site scripting (XSS) issues in rendered content
- Content injection vulnerabilities in any dynamic rendering

---

## What Is Out of Scope

The following are not in scope for security reports at this stage:

- Issues that require a backend, database, or authenticated session that does not exist in this application
- Missing security headers (noted and planned — see `ARCHITECTURE.md`)
- Rate limiting or abuse prevention (not applicable — no forms or accounts exist yet)
- Findings from automated scanners against a non-deployed prototype with no real user data

---

## Current Security Status

APERTURE is **not production-ready**. See [ARCHITECTURE.md § Security Principles](./ARCHITECTURE.md#security-principles) for:

- The full list of security controls that are currently in place
- The full list of controls that are missing and required before public deployment
- The engineering principles that govern how security is addressed as the product grows

Security requirements will be tested and verified — not merely documented — before any production deployment.

---

## Supported Versions

There is no versioned release of APERTURE at this time. All development occurs on the `main` branch. Security fixes, if any, will be applied to `main`.
