{
    local HasPermissions = {
        owner: "root",
        group: self.owner,
    },
    local FilePermissions = {
        filePermissions: "0664",
    },
    local DirPermissions = {
        dirPermissions: "0775",
    },
    local AbstractFile = HasPermissions + FilePermissions {
        to: error self.kind + " must have 'to'",
    },
    CopyFile:: AbstractFile + DirPermissions {
        kind: "CopyFile",
        from: error self.kind + " must have 'from'",
    },
    LiteralFile:: AbstractFile {
        kind: "LiteralFile",
        content: error self.kind + " must have 'content'",
    },
    EnsureDir:: HasPermissions + DirPermissions {
        kind: "EnsureDir",
        dir: error self.kind + " must have 'dir'",
    },
}
