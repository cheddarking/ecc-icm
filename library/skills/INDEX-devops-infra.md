# Skills: devops-infra

Deployment workflows, Docker patterns, and infrastructure skills.

Load one SKILL.md by path when a stage contract or the task needs it. Do not load this whole domain.

| Skill | What it provides |
|---|---|
| `$PLUGIN/library/skills/canary-watch/SKILL.md` | Use this skill to monitor and verify a deployed URL after releases — checks HTTP endpoints, SSE streams, static assets, console errors, and performance regressions after deploys, merges, or dependency upgrades. Smoke / c |
| `$PLUGIN/library/skills/cisco-ios-patterns/SKILL.md` | Cisco IOS and IOS-XE review patterns for show commands, config hierarchy, wildcard masks, ACL placement, interface hygiene, and safe change-window verification. Use when reading, writing, or reviewing Cisco IOS / IOS-XE  |
| `$PLUGIN/library/skills/deployment-patterns/SKILL.md` | Deployment workflows, CI/CD pipeline patterns, Docker containerization, health checks, rollback strategies, and production readiness checklists for web applications. Use when setting up CI/CD, containerizing an app, or c |
| `$PLUGIN/library/skills/docker-patterns/SKILL.md` | Docker and Docker Compose patterns for local development, hardened CLI installer harnesses, container security, networking, volumes, and multi-service orchestration. Use when creating or reviewing Dockerfiles and Compose |
| `$PLUGIN/library/skills/flox-environments/SKILL.md` | "Create reproducible, cross-platform (macOS/Linux) development environments with Flox, a declarative Nix-based environment manager. Use when setting up project toolchains for any language, installing system-level depende |
| `$PLUGIN/library/skills/homelab-network-readiness/SKILL.md` | Readiness checklist for homelab VLAN segmentation, local DNS filtering, and WireGuard-style remote access before changing router, firewall, DHCP, or VPN configuration. |
| `$PLUGIN/library/skills/homelab-network-setup/SKILL.md` | Practical home and homelab network planning for gateways, switches, access points, IP ranges, DHCP reservations, DNS, cabling, and common beginner mistakes. Use when planning or fixing a home or homelab network — gateway |
| `$PLUGIN/library/skills/homelab-pihole-dns/SKILL.md` | Pi-hole installation, blocklist management, DNS-over-HTTPS setup, DHCP integration, local DNS records, and troubleshooting broken DNS resolution on a home network. Use when the task explicitly involves Pi-hole — installi |
| `$PLUGIN/library/skills/homelab-vlan-segmentation/SKILL.md` | Segmenting home networks into VLANs for IoT, guest, trusted, and server traffic using UniFi, pfSense/OPNsense, and MikroTik — including switch trunk config, firewall rules, and wireless SSID mapping. Use when splitting a |
| `$PLUGIN/library/skills/homelab-wireguard-vpn/SKILL.md` | WireGuard VPN server setup, peer configuration, key generation, split tunneling vs full tunnel routing, and remote access to a home network from mobile and laptop clients. Use when setting up WireGuard for remote access  |
| `$PLUGIN/library/skills/kubernetes-patterns/SKILL.md` | Kubernetes workload patterns, resource management, RBAC, probes, autoscaling, ConfigMap/Secret handling, and kubectl debugging for production-grade deployments. Use when writing or reviewing Kubernetes manifests, or debu |
| `$PLUGIN/library/skills/netmiko-ssh-automation/SKILL.md` | Safe Python Netmiko patterns for read-only collection, bounded batch SSH, TextFSM parsing, guarded config changes, timeouts, and network automation error handling. Use when automating network device access with Python Ne |
| `$PLUGIN/library/skills/network-bgp-diagnostics/SKILL.md` | Diagnostics-only BGP troubleshooting patterns for neighbor state, route exchange, prefix policy, AS path inspection, and safe evidence collection. Use when a BGP neighbor is down, routes are missing, or prefix policy and |
| `$PLUGIN/library/skills/network-config-validation/SKILL.md` | Pre-deployment checks for router and switch configuration, including dangerous commands, duplicate addresses, subnet overlaps, stale references, management-plane risk, and IOS-style security hygiene. Use when reviewing a |
| `$PLUGIN/library/skills/network-interface-health/SKILL.md` | Diagnose interface errors, drops, CRCs, duplex mismatches, flapping, speed negotiation issues, and counter trends on routers, switches, and Linux hosts. Use when an interface shows errors, drops, CRCs, flapping, or a dup |
| `$PLUGIN/library/skills/terminal-opener/SKILL.md` | Open an executable and its argument array in a visible terminal window through a reusable, shell-free launch plan with dry-run, JSON, capability detection, detached fallback, and standalone recovery modes. Use when Codex |
| `$PLUGIN/library/skills/uncloud/SKILL.md` | Use when managing an Uncloud cluster — deploying services, configuring Caddy ingress, adding static proxy routes for non-cluster devices, publishing ports, scaling, inspecting logs, or managing machines and volumes with  |
