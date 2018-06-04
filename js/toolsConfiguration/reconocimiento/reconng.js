CONF.interfaz.panel.toolsType.reconocimiento.tools["reconNg"] = {
	"modules" : {
		"recon" : {
			"companies-contacts" : {
				"bing_linkedin_cache" : { 
					"modulo" : "recon/companies-contacts/bing_linkedin_cache"
				},
				"jigsaw" : {
					"point_usage" : {
						"modulo" : "recon/companies-contacts/jigsaw/point_usage"
					},
					"purchase_contact" : {
						"modulo" : "recon/companies-contacts/jigsaw/point_usage"
					}
				}
			},
			"companies-multi" : {
				"github_miner" : { 
					"modulo" : "recon/companies-multi/github_miner"
				},
				"whois_miner" : { 
					"modulo" : "recon/companies-multi/whois_miner"
				}
			},
			"contacts-contacts" : {
				"mailtester" : { 
					"modulo" : "recon/contacts-contacts/mailtester"
				},
				"mangle" : { 
					"modulo" : "recon/contacts-contacts/mangle"
				},
				"unmangle" : { 
					"modulo" : "recon/contacts-contacts/unmangle"
				}
			},
			"contacts-credentials" : {
				"hibp_breach" : { 
					"modulo" : "recon/contacts-credentials/hibp_breach"
				},
				"hibp_paste" : { 
					"modulo" : "recon/contacts-credentials/hibp_paste"
				}
			},
			"contacts-domains" : {
				"migrate_contacts" : { 
					"modulo" : "recon/contacts-domains/migrate_contacts"
				}
			},
			"contacts-profiles" : {
				"fullcontact" : { 
					"modulo" : "recon/contacts-profiles/fullcontact"
				}
			},
			"credentials-credentials" : {
				"adobe" : { 
					"modulo" : "recon/credentials-credentials/adobe"
				},
				"bozocrack" : { 
					"modulo" : "recon/credentials-credentials/bozocrack"
				},
				"hashes_org" : { 
					"modulo" : "recon/credentials-credentials/hashes_org"
				}
			},
			"domains-contacts" : {
				"metacrawler" : { 
					"modulo" : "recon/domains-contacts/metacrawler"
				},
				"pgp_search" : { 
					"modulo" : "recon/domains-contacts/pgp_search"
				},
				"whois_pocs" : { 
					"modulo" : "recon/domains-contacts/whois_pocs"
				}
			},
			"domains-credentials" : {
				"pwnedlist" : { 
					"account_creds" : { 
						"modulo" : "recon/domains-credentials/pwnedlist/account_creds"
					},
					"api_usage" : { 
						"modulo" : "recon/domains-credentials/pwnedlist/api_usage"
					},
					"domain_creds" : { 
						"modulo" : "recon/domains-credentials/pwnedlist/domain_creds"
					},
					"domain_ispwned" : { 
						"modulo" : "recon/domains-credentials/pwnedlist/domain_ispwned"
					},
					"leak_lookup" : { 
						"modulo" : "recon/domains-credentials/pwnedlist/leak_lookup"
					},
					"leaks_dump" : { 
						"modulo" : "recon/domains-credentials/pwnedlist/leaks_dump"
					}
				}
			},
			"domains-domains" : {
				"brute_suffix" : {
					"modulo" : "recon/domains-domains/brute_suffix"
				}
			},
			"domains-hosts" : {
				"bing_domain_api" : {
					"modulo" : "recon/domains-hosts/bing_domain_api"
				},
				"bing_domain_web" : {
					"modulo" : "recon/domains-hosts/bing_domain_web"
				},
				"brute_hosts" : {
					"modulo" : "recon/domains-hosts/brute_hosts"
				},
				"builtwith" : {
					"modulo" : "recon/domains-hosts/builtwith"
				},
				"certificate_transparency" : {
					"modulo" : "recon/domains-hosts/certificate_transparency"
				},
				"google_site_api" : {
					"modulo" : "recon/domains-hosts/google_site_api"
				},
				"google_site_web" : {
					"modulo" : "recon/domains-hosts/google_site_web"
				},
				"hackertarget" : {
					"modulo" : "recon/domains-hosts/hackertarget"
				},
				"mx_spf_ip" : {
					"modulo" : "recon/domains-hosts/mx_spf_ip"
				},
				"netcraft" : {
					"modulo" : "recon/domains-hosts/netcraft"
				},
				"shodan_hostname" : {
					"modulo" : "recon/domains-hosts/shodan_hostname"
				},
				"ssl_san" : {
					"modulo" : "recon/domains-hosts/ssl_san"
				},
				"threatcrowd" : {
					"modulo" : "recon/domains-hosts/threatcrowd"
				}
			},
			"domains-vulnerabilities" : {
				"ghdb" : {
					"modulo" : "recon/domains-vulnerabilities/ghdb"
				},
				"punkspider" : {
					"modulo" : "recon/domains-vulnerabilities/punkspider"
				},
				"xssed" : {
					"modulo" : "recon/domains-vulnerabilities/xssed"
				},
				"xssposed" : {
					"modulo" : "recon/domains-vulnerabilities/xssposed"
				}
			},
			"hosts-domains" : {
				"migrate_hosts" : {
					"modulo" : "recon/hosts-domains/migrate_hosts"
				}
			},
			"hosts-hosts" : {
				"bing_ip" : {
					"modulo" : "recon/hosts-hosts/bing_ip"
				},
				"freegeoip" : {
					"modulo" : "recon/hosts-hosts/freegeoip"
				},
				"ipinfodb" : {
					"modulo" : "recon/hosts-hosts/ipinfodb"
				},
				"resolve" : {
					"modulo" : "recon/hosts-hosts/resolve"
				},
				"reverse_resolve" : {
					"modulo" : "recon/hosts-hosts/reverse_resolve"
				},
				"ssltools" : {
					"modulo" : "recon/hosts-hosts/ssltools"
				}
			},
			"hosts-locations" : {
				"migrate_hosts" : {
					"modulo" : "recon/hosts-locations/migrate_hosts"
				}
			},
			"hosts-ports" : {
				"shodan_ip" : {
					"modulo" : "recon/hosts-ports/shodan_ip"
				}
			},
			"locations-locations" : {
				"geocode" : {
					"modulo" : "recon/locations-locations/geocode"
				},
				"reverse_geocode" : {
					"modulo" : "recon/locations-locations/reverse_geocode"
				}
			},
			"locations-pushpins" : {
				"flickr" : {
					"modulo" : "recon/locations-pushpins/flickr"
				},
				"picasa" : {
					"modulo" : "recon/locations-pushpins/picasa"
				},
				"shodan" : {
					"modulo" : "recon/locations-pushpins/shodan"
				},
				"twitter" : {
					"modulo" : "recon/locations-pushpins/twitter"
				},
				"youtube" : {
					"modulo" : "recon/locations-pushpins/youtube"
				}
			},
			"netblocks-companies" : {
				"whois_orgs" : {
					"modulo" : "recon/netblocks-companies/whois_orgs"
				}
			},
			"netblocks-hosts" : {
				"reverse_resolve" : {
					"modulo" : "recon/netblocks-hosts/reverse_resolve"
				},
				"shodan_net" : {
					"modulo" : "recon/netblocks-hosts/shodan_net"
				}
			},
			"netblocks-ports" : {
				"census_2012" : {
					"modulo" : "recon/netblocks-hosts/census_2012"
				},
				"censysio" : {
					"modulo" : "recon/netblocks-hosts/censysio"
				}
			},
			"ports-hosts" : {
				"migrate_ports" : {
					"modulo" : "recon/ports-hosts/migrate_ports"
				}
			},
			"profiles-contacts" : {
				"dev_diver" : {
					"modulo" : "recon/profiles-contacts/dev_diver"
				},
				"github_users" : {
					"modulo" : "recon/profiles-contacts/github_users"
				}
			},
			"profiles-profiles" : {
				"namechk" : {
					"modulo" : "recon/profiles-contacts/namechk"
				},
				"profiler" : {
					"modulo" : "recon/profiles-contacts/profiler"
				},
				"twitter_mentioned" : {
					"modulo" : "recon/profiles-contacts/twitter_mentioned"
				},
				"twitter_mentions" : {
					"modulo" : "recon/profiles-contacts/twitter_mentions"
				}
			},
			"profiles-repositories" : {
				"github_repos" : {
					"modulo" : "recon/profiles-repositories/github_repos"
				}
			},
			"repositories-profiles" : {
				"github_commits" : {
					"modulo" : "recon/repositories-profiles/github_commits"
				}
			},
			"repositories-vulnerabilities" : {
				"gists_search" : {
					"modulo" : "recon/repositories-vulnerabilities/gists_search"
				},
				"github_dorks" : {
					"modulo" : "recon/repositories-vulnerabilities/github_dorks"
				}
			}
		}
	}
}