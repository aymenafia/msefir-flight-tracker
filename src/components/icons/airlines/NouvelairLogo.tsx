import { SVGProps } from 'react';

export function NouvelairLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 2560 618"
      {...props}
      className={`fill-current text-foreground ${props.className || ''}`}
    >
      <path d="M122 558V60h168v498h-168z" />
      <path d="M290 618h168V0H290v618z" />
      <path d="M518 403c0 98 56 155 140 155s140-57 140-155V0H518v403zM658 58c55 0 84 37 84 97v248c0 60-29 97-84 97s-84-37-84-97V155c0-60 29-97 84-97z" />
      <path d="M854 403c0 98 56 155 140 155s140-57 140-155V0H854v403zm140-345c55 0 84 37 84 97v248c0 60-29 97-84 97s-84-37-84-97V155c0-60 29-97 84-97z" />
      <path d="M1190 558V60h168v498h-168z" />
      <path d="M1526 558V60h168v498h-168z" />
      <path d="M1358 618h168V0h-168v618z" />
      <path d="M1750 618h168V0h-168v618z" />
      <path d="M1974 558V176h-56v-60h56V60h168v56h56v60h-56v382h-168z" />
      <path d="M2254 558V60h168v498h-168z" />
      <path d="M2560 558H2422V60h138l-46 249 46 249z" />
    </svg>
  );
}
