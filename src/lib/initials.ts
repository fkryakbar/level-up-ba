const AVATAR_MAP: Record<string, string> = {
  PAHRIAH: "👩🏻",
  SAUDAH: "👩🏽",
  MAULIDA: "👩🏽",
  NORCAHYANTI: "👩🏽",
  ALYA: "👩🏻",
  "NOR ALLINDA": "👩🏻",
  "REVALINA BAHRI": "👩🏽",
  "SARI PURNAMA": "👩🏻",
  RAHMA: "👩🏽",
  NADIA: "👩🏻",
  FITRI: "👩🏽",
  LAILA: "👩🏻",
  HANNA: "👩🏻",
};

const EMOJI_AVATARS = ["👩🏻", "👩🏽", "👩🏼", "👩🏾", "👩"];

export function getAvatarEmoji(name: string, fallbackAvatar?: string): string {
  if (fallbackAvatar && fallbackAvatar.trim() !== "" && !/^[A-Z]{1,2}$/i.test(fallbackAvatar.trim())) {
    return fallbackAvatar;
  }
  const norm = name.trim().toUpperCase();
  if (AVATAR_MAP[norm]) return AVATAR_MAP[norm];

  let hash = 0;
  for (let i = 0; i < norm.length; i++) {
    hash = (hash << 5) - hash + norm.charCodeAt(i);
    hash |= 0;
  }
  const idx = Math.abs(hash) % EMOJI_AVATARS.length;
  return EMOJI_AVATARS[idx];
}

export function initials(name: string): string {
  return getAvatarEmoji(name);
}