{
    Mixin:: {
        cmds+:
            if std.length(self.pipPackages) == 0 then
                []
            else
                ["pip install " + std.join(" ", self.pipPackages)],
        pipPackages:: [],
    },

}
