import ProfileABI from "./Profile.json"
import MentorABI from "./Mentor.json"
import LacentBadgeABI from "./LancentBadge.json"
import LaentContentABI from './LacentContent.json'

const profileAddress = "0xb656E4E3258fD2D28c56E4aeA818840B905Ecb73"
const MentorAddress = "0x6F2894520E98c81a75010B54F6F57c033dc30f93"
const LancentBadgeAddress = "0xF152B89DddfF08b0dC1D6Cd37A239F7045C81845"
const LacentContentAddress = "0x9fcf671BA1C4D5193E762AFaFb209EE17bEa76e3"

const lacentBadgeAbi = LacentBadgeABI
const ProfileAbi = ProfileABI
const MentorAbi = MentorABI
const LacentContentAbi = LaentContentABI

export {
    profileAddress,
    ProfileAbi,
    MentorAddress,
    MentorAbi,
    lacentBadgeAbi,
    LancentBadgeAddress,
    LacentContentAddress,
    LacentContentAbi
}