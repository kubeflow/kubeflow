// Connect to machines using the username "ubuntu" and -i yourkey.pem

// Source: http://cloud-images.ubuntu.com/locator/ec2/
// There is a URL to get a JSON dump but I've lost it.

local regions(amis) = std.set([a[0] for a in amis]);
local region_amis(amis, v) = [a for a in amis if a[0] == v];

local oses(amis) = std.set([a[1] for a in amis]);
local os_amis(amis, v) = [a for a in amis if a[1] == v];

local archs(amis) = std.set([a[3] for a in amis]);
local arch_amis(amis, v) = [a for a in amis if a[3] == v];

local dates(amis) = std.set([a[5] for a in amis]);
local date_amis(amis, v) = [a for a in amis if a[5] == v];

local strip_from_url(url) =
    local suffix = std.split(url, ">")[1];
    std.substr(suffix, 0, std.length(suffix) - 3);

local all_amis = (import "ubuntu_raw.json").aaData;

{
    [os]: local this_os_amis = os_amis(all_amis, os); {
        [arch]: local this_arch_amis = arch_amis(this_os_amis, arch); {
            [date]: local this_date_amis = date_amis(this_arch_amis, date); {
                [r]: strip_from_url(region_amis(this_date_amis, r)[0][6])
                for r in regions(this_date_amis)
            } for date in dates(this_arch_amis)
        } for arch in archs(this_os_amis)
    } for os in oses(all_amis)
}
