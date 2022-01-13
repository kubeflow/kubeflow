export interface AvatarGroupClasses {
    /** Styles applied to the root element. */
    root: string;
    /** Styles applied to the avatar elements. */
    avatar: string;
}
export declare type AvatarGroupClassKey = keyof AvatarGroupClasses;
export declare function getAvatarGroupUtilityClass(slot: string): string;
declare const avatarGroupClasses: AvatarGroupClasses;
export default avatarGroupClasses;
