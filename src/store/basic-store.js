import {create} from "zustand";

export const basicStore = create((set) => ({
    clicked: false,
    detailsAddress: [],
    details: false,
    minLength: 5,
    wordSkip: 0,
    wordShuffle: 0,
    viewAddress: [],
    view: false,
    highlightClasses: [
        "",
        "text-white bg-[#0A004A]",
        "text-white bg-[#21A8B0]",
        "text-white bg-[#668833]",
        "text-white bg-[#F1B244]",
        "text-white bg-[#DB7430]",
        "text-white bg-[#D15549]"
      ],
    statusText: [
        "Encoding...",
        "Ready to fetch transcript",
        "Fetching transcript",
        "Searching document",
        "Searched ✔️",
      ],
    setClick: () => set(() => ({clicked: true})),
    setLength: (val) => set(() => ({minLength: val})),
    setSkip: (val) => set(() => ({wordSkip: val})),
    setShuffle: (val) => set(() => ({wordShuffle: val})),
    setDetails: (val) => set(() => {
        let bool = false;
        if (val.length > 0) {
            bool = true;
        }
        return {detailsAddress: val, details: bool}
    }),
    
    setView: (val) => set(() => {
        let bool = false;
        if (val.length > 0) {
            bool = true
        }
        return {view: bool, viewAddress: val}
    })
}))