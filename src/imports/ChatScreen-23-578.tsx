import svgPaths from "./svg-1kg576inv5";
import imgAvatarStyle6 from "figma:asset/d7437995b6aeee65e7688cd80dd4ddfdd456da5a.png";
import imgImage21 from "figma:asset/4dfa47455707fc8280f082b5bb0afccef2b14a4c.png";

function Group33081() {
  return (
    <div className="h-[25.354px] relative shrink-0 w-[108.576px]">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 109 26"
      >
        <g id="Group 33081">
          <g id="OtterMon AI">
            <path d={svgPaths.p22e84d00} fill="var(--fill-0, #FAFAFA)" />
            <path d={svgPaths.p24771400} fill="var(--fill-0, #FAFAFA)" />
            <path d={svgPaths.p859500} fill="var(--fill-0, #FAFAFA)" />
            <path d={svgPaths.p2999b700} fill="var(--fill-0, #FAFAFA)" />
            <path d={svgPaths.p2a9f3400} fill="var(--fill-0, #FAFAFA)" />
            <path d={svgPaths.p34ed6100} fill="var(--fill-0, #FAFAFA)" />
            <path d={svgPaths.p22d5f500} fill="var(--fill-0, #FAFAFA)" />
            <path d={svgPaths.p15fda700} fill="var(--fill-0, #FAFAFA)" />
            <path d={svgPaths.p27dfa700} fill="var(--fill-0, #FAFAFA)" />
            <path d={svgPaths.pdbaa500} fill="var(--fill-0, #FAFAFA)" />
          </g>
          <path
            d={svgPaths.pd780d80}
            fill="var(--fill-0, #5E97FF)"
            id="Star 1"
          />
        </g>
      </svg>
    </div>
  );
}

function StartContent() {
  return (
    <div className="relative shrink-0 size-5" data-name="startContent">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 20 20"
      >
        <g id="startContent" opacity="0.5">
          <g id="Vector">
            <path d={svgPaths.p637a500} fill="var(--fill-0, white)" />
            <path
              clipRule="evenodd"
              d={svgPaths.p3462af80}
              fill="var(--fill-0, white)"
              fillRule="evenodd"
            />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Logo() {
  return (
    <div className="relative shrink-0 w-full" data-name="Logo">
      <div className="absolute border-[#3d3d3d] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-end relative size-full">
        <div className="box-border content-stretch flex flex-row items-end justify-between pb-5 pt-4 px-5 relative w-full">
          <Group33081 />
          <StartContent />
        </div>
      </div>
    </div>
  );
}

function CloseCircle() {
  return (
    <div className="relative size-[16.903px]" data-name="close-circle">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 17 17"
      >
        <g id="close-circle">
          <g id="Vector">
            <path d={svgPaths.p26ce4080} fill="var(--fill-0, white)" />
            <path d={svgPaths.p19bf7100} fill="var(--fill-0, white)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function VuesaxOutlineCloseCircle() {
  return (
    <div
      className="absolute contents left-[-2.951px] top-[-2.954px]"
      data-name="vuesax/outline/close-circle"
    >
      <div className="absolute flex h-[23.887px] items-center justify-center left-[-2.951px] top-[-2.954px] w-[23.887px]">
        <div className="flex-none rotate-[45deg]">
          <CloseCircle />
        </div>
      </div>
    </div>
  );
}

function StartContent1() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="startContent">
      <VuesaxOutlineCloseCircle />
    </div>
  );
}

function Button() {
  return (
    <div
      className="basis-0 grow h-10 min-h-px min-w-px relative rounded-lg shrink-0"
      data-name="Button"
      style={{
        backgroundImage:
          "linear-gradient(92.946deg, rgb(94, 151, 255) 13.302%, rgb(23, 56, 222) 93.324%)",
      }}
    >
      <div className="flex flex-row items-center justify-center relative size-full">
        <div className="box-border content-stretch flex flex-row gap-1.5 h-10 items-center justify-center p-[12px] relative w-full">
          <StartContent1 />
          <div className="flex flex-col font-['Lufga:SemiBold',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[14px] text-left text-nowrap">
            <p className="block leading-[normal] whitespace-pre">New Chat</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function NewCHat() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2.5 items-center justify-start p-0 relative shrink-0 w-full"
      data-name="New CHat"
    >
      <Button />
    </div>
  );
}

function Frame1000002393() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="relative size-full">
        <div className="box-border content-stretch flex flex-col gap-2.5 items-start justify-start p-[20px] relative w-full">
          <NewCHat />
        </div>
      </div>
    </div>
  );
}

function NewCHat2() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2.5 items-center justify-start pb-0 pt-4 px-0 relative shrink-0 w-full"
      data-name="New CHat"
    >
      <div className="basis-0 flex flex-col font-['Lufga:Regular',_sans-serif] grow justify-center leading-[0] min-h-px min-w-px not-italic opacity-50 relative shrink-0 text-[#ffffff] text-[14px] text-left">
        <p className="block leading-[normal]">Recent Chats</p>
      </div>
    </div>
  );
}

function NewCHat3() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2.5 items-center justify-start px-0 py-3 relative shrink-0 w-full"
      data-name="New CHat"
    >
      <div className="basis-0 flex flex-col font-['Lufga:Regular',_sans-serif] grow justify-center leading-[0] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#ffffff] text-[14px] text-left text-nowrap">
        <p className="[text-overflow:inherit] [text-wrap-mode:inherit]\' [white-space-collapse:inherit] block leading-[normal] overflow-inherit">
          Help me rewrite this email profession...
        </p>
      </div>
    </div>
  );
}

function NewCHat4() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2.5 items-center justify-start px-0 py-3 relative shrink-0 w-full"
      data-name="New CHat"
    >
      <div className="basis-0 flex flex-col font-['Lufga:Regular',_sans-serif] grow justify-center leading-[0] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#ffffff] text-[14px] text-left text-nowrap">
        <p className="[text-overflow:inherit] [text-wrap-mode:inherit]\' [white-space-collapse:inherit] block leading-[normal] overflow-inherit">
          How do I explain this product to non...
        </p>
      </div>
    </div>
  );
}

function NewCHat5() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2.5 items-center justify-start px-0 py-3 relative shrink-0 w-full"
      data-name="New CHat"
    >
      <div className="basis-0 flex flex-col font-['Lufga:Regular',_sans-serif] grow justify-center leading-[0] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#ffffff] text-[14px] text-left text-nowrap">
        <p className="[text-overflow:inherit] [text-wrap-mode:inherit]\' [white-space-collapse:inherit] block leading-[normal] overflow-inherit">
          Give me smart questions to ask in a ...
        </p>
      </div>
    </div>
  );
}

function NewCHat6() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2.5 items-center justify-start px-0 py-3 relative shrink-0 w-full"
      data-name="New CHat"
    >
      <div className="basis-0 flex flex-col font-['Lufga:Regular',_sans-serif] grow justify-center leading-[0] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#ffffff] text-[14px] text-left text-nowrap">
        <p className="[text-overflow:inherit] [text-wrap-mode:inherit]\' [white-space-collapse:inherit] block leading-[normal] overflow-inherit">
          Draft a project timeline for MVP launch
        </p>
      </div>
    </div>
  );
}

function NewCHat7() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2.5 items-center justify-start px-0 py-3 relative shrink-0 w-full"
      data-name="New CHat"
    >
      <div className="basis-0 flex flex-col font-['Lufga:Regular',_sans-serif] grow justify-center leading-[0] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#ffffff] text-[14px] text-left text-nowrap">
        <p className="[text-overflow:inherit] [text-wrap-mode:inherit]\' [white-space-collapse:inherit] block leading-[normal] overflow-inherit">
          What’s a better way to phrase this UX...
        </p>
      </div>
    </div>
  );
}

function NewCHat8() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2.5 items-center justify-start px-0 py-3 relative shrink-0 w-full"
      data-name="New CHat"
    >
      <div className="basis-0 flex flex-col font-['Lufga:Regular',_sans-serif] grow justify-center leading-[0] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#ffffff] text-[14px] text-left text-nowrap">
        <p className="[text-overflow:inherit] [text-wrap-mode:inherit]\' [white-space-collapse:inherit] block leading-[normal] overflow-inherit">
          How to turn a spreadsheet into a dash...
        </p>
      </div>
    </div>
  );
}

function NewCHat9() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2.5 items-center justify-start px-0 py-3 relative shrink-0 w-full"
      data-name="New CHat"
    >
      <div className="basis-0 flex flex-col font-['Lufga:Regular',_sans-serif] grow justify-center leading-[0] min-h-px min-w-px not-italic overflow-ellipsis overflow-hidden relative shrink-0 text-[#ffffff] text-[14px] text-left text-nowrap">
        <p className="[text-overflow:inherit] [text-wrap-mode:inherit]\' [white-space-collapse:inherit] block leading-[normal] overflow-inherit">
          The advantages of Artificial Intelligence
        </p>
      </div>
    </div>
  );
}

function Frame1000002398() {
  return (
    <div className="box-border content-stretch flex flex-col items-start justify-start p-0 relative shrink-0 w-full">
      <NewCHat3 />
      <NewCHat4 />
      <NewCHat5 />
      <NewCHat6 />
      <NewCHat7 />
      <NewCHat8 />
      <NewCHat9 />
    </div>
  );
}

function Frame1000002394() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-full">
      <div className="relative size-full">
        <div className="box-border content-stretch flex flex-col gap-2.5 items-start justify-start px-5 py-0 relative size-full">
          <NewCHat2 />
          <Frame1000002398 />
        </div>
      </div>
    </div>
  );
}

function StartContent4() {
  return (
    <div className="relative shrink-0 size-5" data-name="startContent">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 20 20"
      >
        <g id="startContent">
          <ellipse
            cx="7.50081"
            cy="5"
            fill="var(--fill-0, white)"
            id="Vector"
            rx="3.33333"
            ry="3.33333"
          />
          <ellipse
            cx="7.50081"
            cy="14.1675"
            fill="var(--fill-0, white)"
            id="Vector_2"
            rx="5.83333"
            ry="3.33333"
          />
          <g id="Vector_3">
            <path d={svgPaths.p3df34f00} fill="var(--fill-0, white)" />
            <path d={svgPaths.p10e2d200} fill="var(--fill-0, white)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function NewCHat11() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2.5 items-center justify-start px-0 py-4 relative shrink-0 w-full"
      data-name="New CHat"
    >
      <div className="absolute border-[#3d3d3d] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <StartContent4 />
      <div className="basis-0 flex flex-col font-['Lufga:Medium',_sans-serif] grow justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#ffffff] text-[14px] text-left">
        <p className="block leading-[normal]">My Team</p>
      </div>
    </div>
  );
}

function StartContent5() {
  return (
    <div className="relative shrink-0 size-5" data-name="startContent">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 20 20"
      >
        <g id="startContent">
          <g id="Vector">
            <path d={svgPaths.p2f762900} fill="var(--fill-0, white)" />
            <path d={svgPaths.p1330f700} fill="var(--fill-0, white)" />
            <path d={svgPaths.p3e8e2080} fill="var(--fill-0, white)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function NewCHat12() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2.5 items-center justify-start px-0 py-4 relative shrink-0 w-full"
      data-name="New CHat"
    >
      <StartContent5 />
      <div className="basis-0 flex flex-col font-['Lufga:Medium',_sans-serif] grow justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[#ffffff] text-[14px] text-left">
        <p className="block leading-[normal]">Integration</p>
      </div>
    </div>
  );
}

function Frame1000002400() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="relative size-full">
        <div className="box-border content-stretch flex flex-col items-start justify-start px-5 py-0 relative w-full">
          <NewCHat11 />
          <NewCHat12 />
        </div>
      </div>
    </div>
  );
}

function AvatarStyle6() {
  return (
    <div className="relative shrink-0 size-[34px]" data-name="Avatar Style 6">
      <img
        className="block max-w-none size-full"
        height="34"
        loading="lazy"
        src={imgAvatarStyle6}
        width="34"
      />
    </div>
  );
}

function Frame1000002396() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-row gap-2 grow items-center justify-start min-h-px min-w-px p-0 relative shrink-0">
      <AvatarStyle6 />
      <div className="font-['Plus_Jakarta_Sans:Bold',_sans-serif] font-bold leading-[0] relative shrink-0 text-[#ffffff] text-[14px] text-center text-nowrap">
        <p className="block leading-none whitespace-pre">Adela Parkson</p>
      </div>
    </div>
  );
}

function StartContent6() {
  return (
    <div className="relative shrink-0 size-5" data-name="startContent">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 20 20"
      >
        <g id="startContent">
          <path
            clipRule="evenodd"
            d={svgPaths.p10299600}
            fill="var(--fill-0, white)"
            fillRule="evenodd"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function StartContent7() {
  return (
    <div className="relative size-5" data-name="startContent">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 20 20"
      >
        <g id="startContent">
          <g id="Vector">
            <path
              clipRule="evenodd"
              d={svgPaths.p22352180}
              fill="var(--fill-0, #D84343)"
              fillRule="evenodd"
            />
            <path d={svgPaths.p24703000} fill="var(--fill-0, #D84343)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Logout() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-4 items-start justify-start overflow-clip px-1.5 py-2.5 relative rounded-[31px] shrink-0"
      data-name="Logout"
    >
      <StartContent6 />
      <div className="flex items-center justify-center relative shrink-0">
        <div className="flex-none rotate-[180deg] scale-y-[-100%]">
          <StartContent7 />
        </div>
      </div>
    </div>
  );
}

function InfoCard() {
  return (
    <div
      className="bg-[#383838] h-[62px] relative rounded-[30px] shrink-0 w-full"
      data-name="Info Card"
    >
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex flex-row gap-8 h-[62px] items-center justify-start p-[14px] relative w-full">
          <Frame1000002396 />
          <Logout />
        </div>
      </div>
    </div>
  );
}

function Frame1000002397() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="relative size-full">
        <div className="box-border content-stretch flex flex-col gap-2.5 items-start justify-start px-4 py-5 relative w-full">
          <InfoCard />
        </div>
      </div>
    </div>
  );
}

function Sidebar() {
  return (
    <div
      className="bg-[#242424] box-border content-stretch flex flex-col h-full items-start justify-start overflow-clip p-0 relative shrink-0 w-[312px]"
      data-name="Sidebar"
    >
      <Logo />
      <Frame1000002393 />
      <Frame1000002394 />
      <Frame1000002400 />
      <Frame1000002397 />
    </div>
  );
}

function Frame1000002399() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-col grow items-center justify-center min-h-px min-w-px pb-[11px] pt-0 px-0 relative shrink-0 w-full">
      <div
        className="bg-center bg-cover bg-no-repeat h-[149.095px] mb-[-11px] shrink-0 w-[156.06px]"
        data-name="image (2) 1"
        style={{ backgroundImage: `url('${imgImage21}')` }}
      />
      <div
        className="h-[36.895px] mb-[-11px] relative shrink-0 w-[627.051px]"
        data-name="How can I help you today, Adela?"
      >
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 628 37"
        >
          <g id="How can I help you today, Adela?">
            <path d={svgPaths.p1722bf00} fill="var(--fill-0, black)" />
            <path d={svgPaths.p1722bf00} fill="url(#paint0_linear_1_3981)" />
            <path d={svgPaths.p24784c00} fill="var(--fill-0, black)" />
            <path d={svgPaths.p24784c00} fill="url(#paint1_linear_1_3981)" />
            <path d={svgPaths.p1391f000} fill="var(--fill-0, black)" />
            <path d={svgPaths.p1391f000} fill="url(#paint2_linear_1_3981)" />
            <path d={svgPaths.p2ef5b6f0} fill="var(--fill-0, black)" />
            <path d={svgPaths.p2ef5b6f0} fill="url(#paint3_linear_1_3981)" />
            <path d={svgPaths.p2651cdc0} fill="var(--fill-0, black)" />
            <path d={svgPaths.p2651cdc0} fill="url(#paint4_linear_1_3981)" />
            <path d={svgPaths.pf6afd00} fill="var(--fill-0, black)" />
            <path d={svgPaths.pf6afd00} fill="url(#paint5_linear_1_3981)" />
            <path d={svgPaths.p120d2c80} fill="var(--fill-0, black)" />
            <path d={svgPaths.p120d2c80} fill="url(#paint6_linear_1_3981)" />
            <path d={svgPaths.p1210eb00} fill="var(--fill-0, black)" />
            <path d={svgPaths.p1210eb00} fill="url(#paint7_linear_1_3981)" />
            <path d={svgPaths.p208a8380} fill="var(--fill-0, black)" />
            <path d={svgPaths.p208a8380} fill="url(#paint8_linear_1_3981)" />
            <path d={svgPaths.p1277d800} fill="var(--fill-0, black)" />
            <path d={svgPaths.p1277d800} fill="url(#paint9_linear_1_3981)" />
            <path d={svgPaths.p368c5d00} fill="var(--fill-0, black)" />
            <path d={svgPaths.p368c5d00} fill="url(#paint10_linear_1_3981)" />
            <path d={svgPaths.p1eadaf00} fill="var(--fill-0, black)" />
            <path d={svgPaths.p1eadaf00} fill="url(#paint11_linear_1_3981)" />
            <path d={svgPaths.p3c990380} fill="var(--fill-0, black)" />
            <path d={svgPaths.p3c990380} fill="url(#paint12_linear_1_3981)" />
            <path d={svgPaths.p13e267f0} fill="var(--fill-0, black)" />
            <path d={svgPaths.p13e267f0} fill="url(#paint13_linear_1_3981)" />
            <path d={svgPaths.p37de80f0} fill="var(--fill-0, black)" />
            <path d={svgPaths.p37de80f0} fill="url(#paint14_linear_1_3981)" />
            <path d={svgPaths.p19229000} fill="var(--fill-0, black)" />
            <path d={svgPaths.p19229000} fill="url(#paint15_linear_1_3981)" />
            <path d={svgPaths.p2cc76040} fill="var(--fill-0, black)" />
            <path d={svgPaths.p2cc76040} fill="url(#paint16_linear_1_3981)" />
            <path d={svgPaths.p283e8870} fill="var(--fill-0, black)" />
            <path d={svgPaths.p283e8870} fill="url(#paint17_linear_1_3981)" />
            <path d={svgPaths.p15654f80} fill="var(--fill-0, black)" />
            <path d={svgPaths.p15654f80} fill="url(#paint18_linear_1_3981)" />
            <path d={svgPaths.p3646a100} fill="var(--fill-0, black)" />
            <path d={svgPaths.p3646a100} fill="url(#paint19_linear_1_3981)" />
            <path d={svgPaths.p1724a700} fill="var(--fill-0, black)" />
            <path d={svgPaths.p1724a700} fill="url(#paint20_linear_1_3981)" />
            <path d={svgPaths.p9b24d00} fill="var(--fill-0, black)" />
            <path d={svgPaths.p9b24d00} fill="url(#paint21_linear_1_3981)" />
            <path d={svgPaths.pdb0ff00} fill="var(--fill-0, black)" />
            <path d={svgPaths.pdb0ff00} fill="url(#paint22_linear_1_3981)" />
            <path d={svgPaths.p18648370} fill="var(--fill-0, black)" />
            <path d={svgPaths.p18648370} fill="url(#paint23_linear_1_3981)" />
            <path d={svgPaths.p39f77480} fill="var(--fill-0, black)" />
            <path d={svgPaths.p39f77480} fill="url(#paint24_linear_1_3981)" />
            <path d={svgPaths.p28ca7900} fill="var(--fill-0, black)" />
            <path d={svgPaths.p28ca7900} fill="url(#paint25_linear_1_3981)" />
          </g>
          <defs>
            <linearGradient
              gradientUnits="userSpaceOnUse"
              id="paint0_linear_1_3981"
              x1="82.4325"
              x2="579.78"
              y1="12.5178"
              y2="76.49"
            >
              <stop stopColor="#1738DE" />
              <stop offset="1" stopColor="#5E97FF" />
            </linearGradient>
            <linearGradient
              gradientUnits="userSpaceOnUse"
              id="paint1_linear_1_3981"
              x1="82.4325"
              x2="579.78"
              y1="12.5178"
              y2="76.49"
            >
              <stop stopColor="#1738DE" />
              <stop offset="1" stopColor="#5E97FF" />
            </linearGradient>
            <linearGradient
              gradientUnits="userSpaceOnUse"
              id="paint2_linear_1_3981"
              x1="82.4325"
              x2="579.78"
              y1="12.5178"
              y2="76.49"
            >
              <stop stopColor="#1738DE" />
              <stop offset="1" stopColor="#5E97FF" />
            </linearGradient>
            <linearGradient
              gradientUnits="userSpaceOnUse"
              id="paint3_linear_1_3981"
              x1="82.4325"
              x2="579.78"
              y1="12.5178"
              y2="76.49"
            >
              <stop stopColor="#1738DE" />
              <stop offset="1" stopColor="#5E97FF" />
            </linearGradient>
            <linearGradient
              gradientUnits="userSpaceOnUse"
              id="paint4_linear_1_3981"
              x1="82.4325"
              x2="579.78"
              y1="12.5178"
              y2="76.49"
            >
              <stop stopColor="#1738DE" />
              <stop offset="1" stopColor="#5E97FF" />
            </linearGradient>
            <linearGradient
              gradientUnits="userSpaceOnUse"
              id="paint5_linear_1_3981"
              x1="82.4325"
              x2="579.78"
              y1="12.5178"
              y2="76.49"
            >
              <stop stopColor="#1738DE" />
              <stop offset="1" stopColor="#5E97FF" />
            </linearGradient>
            <linearGradient
              gradientUnits="userSpaceOnUse"
              id="paint6_linear_1_3981"
              x1="82.4325"
              x2="579.78"
              y1="12.5178"
              y2="76.49"
            >
              <stop stopColor="#1738DE" />
              <stop offset="1" stopColor="#5E97FF" />
            </linearGradient>
            <linearGradient
              gradientUnits="userSpaceOnUse"
              id="paint7_linear_1_3981"
              x1="82.4325"
              x2="579.78"
              y1="12.5178"
              y2="76.49"
            >
              <stop stopColor="#1738DE" />
              <stop offset="1" stopColor="#5E97FF" />
            </linearGradient>
            <linearGradient
              gradientUnits="userSpaceOnUse"
              id="paint8_linear_1_3981"
              x1="82.4325"
              x2="579.78"
              y1="12.5178"
              y2="76.49"
            >
              <stop stopColor="#1738DE" />
              <stop offset="1" stopColor="#5E97FF" />
            </linearGradient>
            <linearGradient
              gradientUnits="userSpaceOnUse"
              id="paint9_linear_1_3981"
              x1="82.4325"
              x2="579.78"
              y1="12.5178"
              y2="76.49"
            >
              <stop stopColor="#1738DE" />
              <stop offset="1" stopColor="#5E97FF" />
            </linearGradient>
            <linearGradient
              gradientUnits="userSpaceOnUse"
              id="paint10_linear_1_3981"
              x1="82.4325"
              x2="579.78"
              y1="12.5178"
              y2="76.49"
            >
              <stop stopColor="#1738DE" />
              <stop offset="1" stopColor="#5E97FF" />
            </linearGradient>
            <linearGradient
              gradientUnits="userSpaceOnUse"
              id="paint11_linear_1_3981"
              x1="82.4325"
              x2="579.78"
              y1="12.5178"
              y2="76.49"
            >
              <stop stopColor="#1738DE" />
              <stop offset="1" stopColor="#5E97FF" />
            </linearGradient>
            <linearGradient
              gradientUnits="userSpaceOnUse"
              id="paint12_linear_1_3981"
              x1="82.4325"
              x2="579.78"
              y1="12.5178"
              y2="76.49"
            >
              <stop stopColor="#1738DE" />
              <stop offset="1" stopColor="#5E97FF" />
            </linearGradient>
            <linearGradient
              gradientUnits="userSpaceOnUse"
              id="paint13_linear_1_3981"
              x1="82.4325"
              x2="579.78"
              y1="12.5178"
              y2="76.49"
            >
              <stop stopColor="#1738DE" />
              <stop offset="1" stopColor="#5E97FF" />
            </linearGradient>
            <linearGradient
              gradientUnits="userSpaceOnUse"
              id="paint14_linear_1_3981"
              x1="82.4325"
              x2="579.78"
              y1="12.5178"
              y2="76.49"
            >
              <stop stopColor="#1738DE" />
              <stop offset="1" stopColor="#5E97FF" />
            </linearGradient>
            <linearGradient
              gradientUnits="userSpaceOnUse"
              id="paint15_linear_1_3981"
              x1="82.4325"
              x2="579.78"
              y1="12.5178"
              y2="76.49"
            >
              <stop stopColor="#1738DE" />
              <stop offset="1" stopColor="#5E97FF" />
            </linearGradient>
            <linearGradient
              gradientUnits="userSpaceOnUse"
              id="paint16_linear_1_3981"
              x1="82.4325"
              x2="579.78"
              y1="12.5178"
              y2="76.49"
            >
              <stop stopColor="#1738DE" />
              <stop offset="1" stopColor="#5E97FF" />
            </linearGradient>
            <linearGradient
              gradientUnits="userSpaceOnUse"
              id="paint17_linear_1_3981"
              x1="82.4325"
              x2="579.78"
              y1="12.5178"
              y2="76.49"
            >
              <stop stopColor="#1738DE" />
              <stop offset="1" stopColor="#5E97FF" />
            </linearGradient>
            <linearGradient
              gradientUnits="userSpaceOnUse"
              id="paint18_linear_1_3981"
              x1="82.4325"
              x2="579.78"
              y1="12.5178"
              y2="76.49"
            >
              <stop stopColor="#1738DE" />
              <stop offset="1" stopColor="#5E97FF" />
            </linearGradient>
            <linearGradient
              gradientUnits="userSpaceOnUse"
              id="paint19_linear_1_3981"
              x1="82.4325"
              x2="579.78"
              y1="12.5178"
              y2="76.49"
            >
              <stop stopColor="#1738DE" />
              <stop offset="1" stopColor="#5E97FF" />
            </linearGradient>
            <linearGradient
              gradientUnits="userSpaceOnUse"
              id="paint20_linear_1_3981"
              x1="82.4325"
              x2="579.78"
              y1="12.5178"
              y2="76.49"
            >
              <stop stopColor="#1738DE" />
              <stop offset="1" stopColor="#5E97FF" />
            </linearGradient>
            <linearGradient
              gradientUnits="userSpaceOnUse"
              id="paint21_linear_1_3981"
              x1="82.4325"
              x2="579.78"
              y1="12.5178"
              y2="76.49"
            >
              <stop stopColor="#1738DE" />
              <stop offset="1" stopColor="#5E97FF" />
            </linearGradient>
            <linearGradient
              gradientUnits="userSpaceOnUse"
              id="paint22_linear_1_3981"
              x1="82.4325"
              x2="579.78"
              y1="12.5178"
              y2="76.49"
            >
              <stop stopColor="#1738DE" />
              <stop offset="1" stopColor="#5E97FF" />
            </linearGradient>
            <linearGradient
              gradientUnits="userSpaceOnUse"
              id="paint23_linear_1_3981"
              x1="82.4325"
              x2="579.78"
              y1="12.5178"
              y2="76.49"
            >
              <stop stopColor="#1738DE" />
              <stop offset="1" stopColor="#5E97FF" />
            </linearGradient>
            <linearGradient
              gradientUnits="userSpaceOnUse"
              id="paint24_linear_1_3981"
              x1="82.4325"
              x2="579.78"
              y1="12.5178"
              y2="76.49"
            >
              <stop stopColor="#1738DE" />
              <stop offset="1" stopColor="#5E97FF" />
            </linearGradient>
            <linearGradient
              gradientUnits="userSpaceOnUse"
              id="paint25_linear_1_3981"
              x1="82.4325"
              x2="579.78"
              y1="12.5178"
              y2="76.49"
            >
              <stop stopColor="#1738DE" />
              <stop offset="1" stopColor="#5E97FF" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

function StartContent8() {
  return (
    <div className="relative shrink-0 size-6" data-name="startContent">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g id="startContent" opacity="0.5">
          <g id="Vector">
            <path d={svgPaths.p5de6900} fill="var(--fill-0, white)" />
            <path
              clipRule="evenodd"
              d={svgPaths.p9621c00}
              fill="var(--fill-0, white)"
              fillRule="evenodd"
            />
          </g>
        </g>
      </svg>
    </div>
  );
}

function StartContent9() {
  return (
    <div className="relative shrink-0 size-6" data-name="startContent">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g id="startContent" opacity="0.5">
          <g id="Vector">
            <path
              clipRule="evenodd"
              d={svgPaths.p2e050000}
              fill="var(--fill-0, white)"
              fillRule="evenodd"
            />
            <path
              clipRule="evenodd"
              d={svgPaths.p106bf600}
              fill="var(--fill-0, white)"
              fillRule="evenodd"
            />
          </g>
        </g>
      </svg>
    </div>
  );
}

function Frame1000002355() {
  return (
    <div className="box-border content-stretch flex flex-row gap-4 items-center justify-end p-0 relative shrink-0">
      <StartContent8 />
      <StartContent9 />
    </div>
  );
}

function Frame1000002336() {
  return (
    <div className="basis-0 bg-[#242424] grow min-h-px min-w-px relative rounded-bl-[12px] rounded-tl-[12px] shrink-0">
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex flex-row items-center justify-between p-[20px] relative w-full">
          <div className="font-['Lufga:Regular',_sans-serif] leading-[0] not-italic relative shrink-0 text-[#bababa] text-[16px] text-center text-nowrap">
            <p className="block leading-[normal] whitespace-pre">
              Enter a prompt here...
            </p>
          </div>
          <Frame1000002355 />
        </div>
      </div>
    </div>
  );
}

function StartContent10() {
  return (
    <div className="relative shrink-0 size-6" data-name="startContent">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g id="startContent">
          <path d={svgPaths.p4cb0f00} fill="var(--fill-0, white)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function DivIcon() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2.5 items-center justify-center overflow-clip p-[18px] relative rounded-br-[12px] rounded-tr-[12px] self-stretch shrink-0"
      data-name="div.icon"
      style={{
        backgroundImage:
          "linear-gradient(90.4065deg, rgb(94, 151, 255) 13.302%, rgb(23, 56, 222) 93.324%)",
      }}
    >
      <StartContent10 />
    </div>
  );
}

function Prompt() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-start justify-start p-0 relative shrink-0 w-[900px]"
      data-name="Prompt"
    >
      <Frame1000002336 />
      <DivIcon />
    </div>
  );
}

function InputBox() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-center justify-center p-0 relative shrink-0 w-full"
      data-name="Input Box"
    >
      <Prompt />
    </div>
  );
}

function Sidebar1() {
  return (
    <div
      className="basis-0 bg-neutral-900 grow h-full min-h-px min-w-px relative shrink-0"
      data-name="Sidebar"
    >
      <div className="flex flex-col items-center justify-center overflow-clip relative size-full">
        <div className="box-border content-stretch flex flex-col items-center justify-center p-[40px] relative size-full">
          <Frame1000002399 />
          <InputBox />
        </div>
      </div>
    </div>
  );
}

export default function ChatScreen() {
  return (
    <div
      className="backdrop-blur-[48.25px] backdrop-filter bg-neutral-900 box-border content-stretch flex flex-row items-center justify-start p-0 relative size-full"
      data-name="Chat Screen"
    >
      <Sidebar />
      <Sidebar1 />
    </div>
  );
}