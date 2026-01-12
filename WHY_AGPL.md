# Why AGPL-3.0? 🔓

Ideas Vault is licensed under the **GNU Affero General Public License v3.0 (AGPL-3.0)**, a strong copyleft license specifically designed for web applications and network services.

## What is AGPL-3.0?

AGPL-3.0 is like GPL-3.0, but with an important additional provision for software that runs on servers and is accessed over a network (like web applications).

## Key Difference: The Network Loophole

### GPL-3.0 Problem (the "ASP loophole")
With standard GPL-3.0:
- ✅ If someone distributes your modified code, they must share the source
- ❌ If someone modifies your code and runs it as a web service (without distributing), they DON'T have to share the source
- ❌ Company X could take Ideas Vault, add amazing features, run it as a paid SaaS service, and never contribute back

### AGPL-3.0 Solution
With AGPL-3.0:
- ✅ If someone distributes your modified code, they must share the source (same as GPL)
- ✅ If someone modifies your code and runs it as a web service, they MUST provide the source code to users
- ✅ Company X takes Ideas Vault, adds features, runs it as SaaS → they MUST share their improvements

## Why This Matters for Ideas Vault

Ideas Vault is a **web application** designed to run in browsers and potentially as a hosted service. AGPL-3.0 ensures:

### 1. **Community Benefits from All Improvements**
```
Scenario: StartupCorp modifies Ideas Vault and hosts it at ideas.startupcorp.com

GPL-3.0:  StartupCorp can keep modifications private ❌
AGPL-3.0: StartupCorp MUST share source code with users ✅
```

### 2. **No Proprietary SaaS Forks**
Companies cannot:
- Take Ideas Vault
- Add proprietary features
- Offer it as a paid service
- Keep improvements secret

They CAN do all that, but they MUST share the modified source code.

### 3. **Stronger Community Protection**
- All hosted versions must contribute back
- Innovation benefits everyone
- No "dark forks" that never share improvements

## AGPL-3.0 Key Provisions

### Freedom to Use
✅ Run the software for any purpose  
✅ Study how it works  
✅ Modify it to your needs  
✅ Distribute copies  
✅ Distribute modified versions  

### Copyleft Requirements
📋 Disclose source code when distributing  
📋 Disclose source code when providing network access  
📋 License modifications under AGPL-3.0  
📋 Include copyright and license notices  
📋 State changes made to the code  

### Network Use Provision (The Key Difference)
🌐 **If users interact with your modified version over a network (web browser, API, etc.), you must offer them the complete source code under AGPL-3.0**

## Common Questions

### Q: Can I use Ideas Vault for my business?
**Yes!** AGPL-3.0 allows commercial use. You can:
- Use it internally without restrictions
- Offer it as a service to customers
- Charge money for hosting or support

But if you modify it and provide it as a network service, you must share the source.

### Q: Can I create a proprietary fork?
**No.** All derivatives must be AGPL-3.0. This is the "copyleft" protection.

### Q: Can I use Ideas Vault with proprietary software?
**Yes**, as long as Ideas Vault remains separate and you're not creating a derivative work. If you're integrating it deeply, consult a lawyer.

### Q: What if I just want to use it locally?
**No problem!** If you modify Ideas Vault and only use it yourself (not providing network access to others), you don't have to share anything.

### Q: What counts as "network access"?
Any interaction over a network:
- Web browser access (HTTP/HTTPS)
- API access (REST, GraphQL, etc.)
- WebSocket connections
- Mobile app connecting to your server

### Q: How do I comply if I modify and host it?
1. Keep your modifications in a Git repository
2. Add a prominent link in the UI: "Source Code" → your repo
3. Ensure the source includes all modifications
4. License your modifications under AGPL-3.0

Example:
```html
<footer>
  Ideas Vault - Modified version
  <a href="https://github.com/yourcompany/ideasvault-modified">
    View Source Code (AGPL-3.0)
  </a>
</footer>
```

## Comparison with Other Licenses

| License | Use Freely | Modify | Distribute | Run as Service | Must Share Source |
|---------|-----------|--------|-----------|---------------|------------------|
| **MIT** | ✅ | ✅ | ✅ | ✅ | ❌ Never |
| **GPL-3.0** | ✅ | ✅ | ✅ | ✅ | ✅ Only if distributing |
| **AGPL-3.0** | ✅ | ✅ | ✅ | ✅ | ✅ If distributing OR hosting |

## Real-World Examples

### Companies Using AGPL
- **MongoDB** (database) - used AGPL before their own license
- **Grafana** (monitoring) - AGPL-3.0
- **Mattermost** (team chat) - AGPL-3.0 for core
- Many other successful open-source projects

### How They Make Money
AGPL doesn't prevent commercialization:
- **Dual licensing**: AGPL for community, commercial license for businesses
- **Hosted service**: Official managed hosting with support
- **Enterprise features**: Additional proprietary add-ons
- **Support & consulting**: Professional services

## For Contributors

When you contribute to Ideas Vault:
- Your contributions are automatically AGPL-3.0
- You retain copyright to your work
- Everyone benefits from your improvements
- You're protected from proprietary forks of your work

## For Users

AGPL-3.0 means:
- ✅ You can always access the source code
- ✅ You can modify and improve the software
- ✅ You can trust the software (no hidden code)
- ✅ You own your data and workflow
- ✅ The software will remain free forever

## For Businesses

AGPL-3.0 is business-friendly IF you're willing to share:
- ✅ Use internally without restrictions
- ✅ Offer as a service (just share source)
- ✅ Build a business around it
- ✅ Charge for hosting/support/features

Not business-friendly if:
- ❌ You want to create closed-source derivative
- ❌ You want to "embrace, extend, extinguish"
- ❌ You want proprietary lock-in

## The Philosophy

> "If you run a modified version on a server and let others interact with it, you should share your improvements with them."

AGPL-3.0 extends the freedom of open source to the age of web services and SaaS applications. It ensures that the community benefits from all improvements, not just those that are distributed as software packages.

## Resources

- **Full License Text**: [LICENSE](./LICENSE)
- **Official AGPL-3.0**: https://www.gnu.org/licenses/agpl-3.0.html
- **FSF AGPL Guide**: https://www.gnu.org/licenses/why-affero-gpl.html
- **TLDRLegal Summary**: https://tldrlegal.com/license/gnu-affero-general-public-license-v3-(agpl-3.0)

## Summary

**AGPL-3.0 is the right choice for Ideas Vault because:**

1. 🌐 It's a web application (AGPL is designed for this)
2. 🤝 It ensures community benefits from all improvements
3. 🔒 It prevents proprietary SaaS forks
4. 💪 It's a strong copyleft that protects freedom
5. 📈 It's compatible with successful commercial models
6. ✅ It's the license used by many respected web apps

**Ideas Vault: Open source. Always.**

---

*Questions about licensing? Open an issue or discussion on GitHub.*
