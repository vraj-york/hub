import svgPaths from "./svg-15ca0lyozk";
import imgRectangle361 from "figma:asset/199d12720456445de7427bfe867bc333c77e812a.png";

function Frame1000002420() {
  return (
    <div className="backdrop-blur-[23px] backdrop-filter bg-[#44a12c] box-border content-stretch flex flex-row gap-4 h-6 items-center justify-center p-[8px] relative rounded shrink-0">
      <div className="font-['Lufga:Medium',_sans-serif] leading-[0] not-italic relative shrink-0 text-[12px] text-left text-neutral-50 text-nowrap">
        <p className="block leading-[normal] whitespace-pre">Success</p>
      </div>
    </div>
  );
}

function Frame1000002426() {
  return (
    <div className="basis-0 box-border content-stretch flex flex-row gap-3 grow items-center justify-start min-h-px min-w-px p-0 relative shrink-0">
      <div className="font-['Lufga:SemiBold',_sans-serif] leading-[0] not-italic relative shrink-0 text-[24px] text-center text-neutral-50 text-nowrap">
        <p className="block leading-[32px] whitespace-pre">Integration</p>
      </div>
      <Frame1000002420 />
    </div>
  );
}

function StartContent() {
  return (
    <button
      className="block cursor-pointer relative shrink-0 size-8"
      data-name="startContent"
    >
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 32 32"
      >
        <g id="startContent" opacity="0.3">
          <path
            clipRule="evenodd"
            d={svgPaths.p79d2470}
            fill="var(--fill-0, white)"
            fillRule="evenodd"
            id="Vector"
          />
        </g>
      </svg>
    </button>
  );
}

function Frame1000002428() {
  return (
    <div className="box-border content-stretch flex flex-row gap-2.5 h-full items-start justify-center p-0 relative shrink-0">
      <StartContent />
    </div>
  );
}

function Frame1000002425() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="absolute border-[#3d3d3d] border-[0px_0px_1px] border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex flex-row gap-4 items-center justify-start pl-8 pr-5 py-5 relative w-full">
          <div
            className="bg-center bg-cover bg-no-repeat relative rounded-[80px] shrink-0 size-16"
            style={{ backgroundImage: `url('${imgRectangle361}')` }}
          >
            <div className="absolute border-2 border-[#ffffff] border-solid inset-0 pointer-events-none rounded-[80px]" />
          </div>
          <Frame1000002426 />
          <div className="flex flex-row items-center self-stretch">
            <Frame1000002428 />
          </div>
        </div>
      </div>
    </div>
  );
}

function Control() {
  return (
    <div className="relative shrink-0 size-6" data-name="Control">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g id="Control">
          <rect
            height="22"
            rx="11"
            stroke="var(--stroke-0, #5E97FF)"
            strokeWidth="2"
            width="22"
            x="1"
            y="1"
          />
          <circle
            cx="12"
            cy="12"
            fill="var(--fill-0, #5E97FF)"
            id="Ellipse 1"
            r="5"
          />
        </g>
      </svg>
    </div>
  );
}

function Radio() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2 items-center justify-start overflow-clip p-0 relative shrink-0"
      data-name="Radio"
    >
      <Control />
    </div>
  );
}

function Text() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-start justify-start p-0 relative shrink-0"
      data-name="Text"
    >
      <div className="flex flex-col font-['Lufga:Medium',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[16px] text-left text-nowrap">
        <p className="block leading-[normal] whitespace-pre">API Key</p>
      </div>
    </div>
  );
}

function PayoutOptions() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-3 items-center justify-start overflow-clip p-0 relative shrink-0"
      data-name="Payout Options"
    >
      <Radio />
      <Text />
    </div>
  );
}

function Control1() {
  return (
    <div className="relative rounded-xl shrink-0 size-6" data-name="Control">
      <div className="absolute border-2 border-[#3d3d3d] border-solid inset-0 pointer-events-none rounded-xl" />
    </div>
  );
}

function Radio1() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-2 items-center justify-start overflow-clip p-0 relative shrink-0"
      data-name="Radio"
    >
      <Control1 />
    </div>
  );
}

function Text1() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-start justify-start p-0 relative shrink-0"
      data-name="Text"
    >
      <div className="flex flex-col font-['Lufga:Medium',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[16px] text-left text-nowrap">
        <p className="block leading-[normal] whitespace-pre">Credentials</p>
      </div>
    </div>
  );
}

function PayoutOptions1() {
  return (
    <div
      className="box-border content-stretch flex flex-row gap-3 items-center justify-start overflow-clip p-0 relative shrink-0"
      data-name="Payout Options"
    >
      <Radio1 />
      <Text1 />
    </div>
  );
}

function Frame1000006976() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-row items-center relative size-full">
        <div className="box-border content-stretch flex flex-row gap-8 items-center justify-start pb-4 pt-8 px-8 relative w-full">
          <PayoutOptions />
          <PayoutOptions1 />
        </div>
      </div>
    </div>
  );
}

function Frame1000006977() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-col justify-center relative size-full">
        <div className="box-border content-stretch flex flex-col gap-2.5 items-start justify-center leading-[0] not-italic px-8 py-5 relative w-full">
          <div className="font-['Lufga:Medium',_sans-serif] relative shrink-0 text-[24px] text-center text-neutral-50 text-nowrap">
            <p className="block leading-[32px] whitespace-pre">API Keys</p>
          </div>
          <div
            className="font-['Lufga:Regular',_sans-serif] min-w-full opacity-50 relative shrink-0 text-[#ffffff] text-[16px] text-left"
            style={{ width: "min-content" }}
          >
            <p className="block leading-[normal]">
              You need an API Keys to use OtterMon AI. Your API Key is stored
              locally on your browser and never sent anywhere else.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame1000002256() {
  return (
    <div className="bg-[#363636] box-border content-stretch flex flex-row gap-2.5 h-14 items-center justify-start p-[16px] relative rounded-lg shrink-0 w-[487px]">
      <div className="flex flex-col font-['Lufga:Regular',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[16px] text-left text-nowrap">
        <p className="block leading-[normal] whitespace-pre">
          sk_9a8b7c6d5e4f3g2h1i0j
        </p>
      </div>
    </div>
  );
}

function StartContent1() {
  return (
    <div className="relative shrink-0 size-6" data-name="startContent">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g id="startContent">
          <path
            clipRule="evenodd"
            d={svgPaths.pf3daf00}
            fill="var(--fill-0, #9B2026)"
            fillRule="evenodd"
            id="Vector"
          />
        </g>
      </svg>
    </div>
  );
}

function Frame1000002429() {
  return (
    <div className="box-border content-stretch flex flex-row gap-2.5 h-full items-center justify-center p-0 relative shrink-0">
      <StartContent1 />
    </div>
  );
}

function Frame1000006979() {
  return (
    <div className="box-border content-stretch flex flex-row gap-2.5 h-14 items-center justify-start p-0 relative shrink-0">
      <Frame1000002256 />
      <Frame1000002429 />
    </div>
  );
}

function CloseCircle() {
  return (
    <div className="relative size-[22.537px]" data-name="close-circle">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 23 23"
      >
        <g id="close-circle">
          <g id="Vector">
            <path d={svgPaths.p8ad8600} fill="var(--fill-0, #5E97FF)" />
            <path d={svgPaths.p357c5e00} fill="var(--fill-0, #5E97FF)" />
          </g>
        </g>
      </svg>
    </div>
  );
}

function VuesaxOutlineCloseCircle() {
  return (
    <div
      className="absolute contents left-[-3.935px] top-[-3.939px]"
      data-name="vuesax/outline/close-circle"
    >
      <div className="absolute flex h-[31.864px] items-center justify-center left-[-3.935px] top-[-3.939px] w-[31.864px]">
        <div className="flex-none rotate-[45deg]">
          <CloseCircle />
        </div>
      </div>
    </div>
  );
}

function OutlineEssentionalUiPlus() {
  return (
    <div
      className="relative shrink-0 size-6"
      data-name="Outline / Essentional, UI / plus"
    >
      <VuesaxOutlineCloseCircle />
    </div>
  );
}

function Frame1000002258() {
  return (
    <div className="box-border content-stretch flex flex-row gap-2.5 h-14 items-center justify-center p-[16px] relative rounded-lg shrink-0 w-[487px]">
      <div className="absolute border border-[#5e97ff] border-dashed inset-0 pointer-events-none rounded-lg" />
      <OutlineEssentionalUiPlus />
      <div className="flex flex-col font-['Lufga:Medium',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#5e97ff] text-[16px] text-left text-nowrap">
        <p className="block leading-[normal] whitespace-pre">Add New API key</p>
      </div>
    </div>
  );
}

function Frame1000006978() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="relative size-full">
        <div className="box-border content-stretch flex flex-col gap-4 items-start justify-start pb-8 pt-5 px-8 relative w-full">
          {[...Array(2).keys()].map((_, i) => (
            <Frame1000006979 key={i} />
          ))}
          <Frame1000002258 />
        </div>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div
      className="basis-0 grow h-10 min-h-px min-w-px relative rounded-md shrink-0"
      data-name="Button"
      style={{
        backgroundImage:
          "linear-gradient(91.409deg, rgb(94, 151, 255) 13.302%, rgb(23, 56, 222) 93.324%)",
      }}
    >
      <div className="flex flex-row items-center justify-center relative size-full">
        <div className="box-border content-stretch flex flex-row gap-1.5 h-10 items-center justify-center p-[12px] relative w-full">
          <div className="flex flex-col font-['Lufga:SemiBold',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[14px] text-left text-nowrap">
            <p className="block leading-[normal] whitespace-pre">Save</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function NewCHat() {
  return (
    <button
      className="box-border content-stretch flex flex-row gap-2.5 items-center justify-start overflow-visible p-0 relative shrink-0 w-[130px]"
      data-name="New CHat"
    >
      <Button />
    </button>
  );
}

function Button1() {
  return (
    <div
      className="basis-0 bg-[#363636] grow h-10 min-h-px min-w-px relative rounded-md shrink-0"
      data-name="Button"
    >
      <div className="flex flex-row items-center justify-center relative size-full">
        <div className="box-border content-stretch flex flex-row gap-1.5 h-10 items-center justify-center p-[12px] relative w-full">
          <div className="flex flex-col font-['Lufga:SemiBold',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[14px] text-left text-nowrap">
            <p className="block leading-[normal] whitespace-pre">Cancel</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function NewCHat1() {
  return (
    <button
      className="box-border content-stretch flex flex-row gap-2.5 items-center justify-start overflow-visible p-0 relative shrink-0 w-[130px]"
      data-name="New CHat"
    >
      <Button1 />
    </button>
  );
}

function Frame1000002393() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="absolute border-[#3d3d3d] border-[1px_0px_0px] border-solid inset-0 pointer-events-none" />
      <div className="relative size-full">
        <div className="box-border content-stretch cursor-pointer flex flex-row gap-2.5 items-start justify-start px-8 py-5 relative w-full">
          <NewCHat />
          <NewCHat1 />
        </div>
      </div>
    </div>
  );
}

function Integration() {
  return (
    <div
      className="bg-[#242424] box-border content-stretch flex flex-col items-start justify-start p-0 relative rounded-xl shrink-0 w-[842px]"
      data-name="Integration"
    >
      <Frame1000002425 />
      <Frame1000006976 />
      <Frame1000006977 />
      <Frame1000006978 />
      <Frame1000002393 />
    </div>
  );
}

export default function IntegrationPopup() {
  return (
    <div
      className="box-border content-stretch flex flex-row items-center justify-center p-0 relative size-full"
      data-name="Integration - Popup"
    >
      <Integration />
    </div>
  );
}