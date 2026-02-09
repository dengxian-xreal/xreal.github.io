---
id: user_qa_hardware_selection
slug: /user-qa/hardware-selection
title: User Q&A — Hardware Selection
sidebar_label: User Q&A (Hardware)
---

This page is a living log of *real user inquiries* (mostly about hardware selection) and our recommended replies.

Format per entry:
- **Date / Channel**
- **User / Contact**
- **User question (verbatim)**
- **Requirements (parsed)**
- **Reply (recommended / sent)**
- **Notes / follow-ups**

---

## 2026-01-31 — Fixed Wraparound Video (Pinned Instructor)

### User / Contact
- **From:** Tony Di Carlo `tony@dicarlo.us`
- **CC:** Jorge M Ramirez Perez `ramirezperezjorgeman@gmail.com`
- **Original subject:** Fixed Wraparound Video
- **Phone (provided):** (562) 212 0310

### User question (verbatim)
> Hi,
> 
> I have a rather simple application which I suspect your hardware can support. I’m hoping you can confirm.
> 
> I need to display a wraparound instructional video that is pinned in virtual space. The video is mostly blue-screened, such that the user remains fully aware of their surroundings as they move about in 6DOF space. The movements are deliberate and slow, so latency not likely an issue.
> 
> Since physical activity is involved, simplicity and portability would matter more. Also, it would be best if this could be done in full daylight. Though I can always boost contrast on the video if necessary.
> 
> Another way to explain, is to describe the physical setup that I’m looking to replace.
> 
> Currently I do this indoors, with three screens. When the instruction begins I have one screen directly in front of me, one screen to my left, and another screen directly behind me. All three screens show the same instructor from different POV, such that I can always see at least one instance of the instruction regardless of my orientation, which changes throughout the 30-minute routine.
> 
> In the current setup there’s no screen to my right because I’m rarely facing that direction. However, if the AR system can place an instructor on the fourth wall without performance penalty, that would also be good.
> 
> What do you recommend?
> 
> Tony Di Carlo

### Requirements (parsed)
- **Core goal:** A “wraparound” instructor video, **pinned in space** so it stays in place as the user turns/moves.
- **Tracking:** User explicitly wants **6DoF** (walking/moving in space).
- **Content:** Mostly blue-screened video → wants high situational awareness.
- **Session:** ~30 minutes.
- **Constraints:**
  - Prioritize **simplicity + portability** (likely minimal setup).
  - **Full daylight** use is preferred (high ambient light).
- **Current baseline:** 3 physical displays (front/left/back), optionally also right.

### Reply (recommended / ready-to-send)

Hi Tony — thanks for the detailed description.

Yes, this use case is feasible: you’re essentially describing a video element that is **pinned in virtual space** (world-locked) so it stays in place as you turn and move in **6DoF**.

**Recommended XREAL setup (portable + simple):**
- **XREAL One series glasses** for the display
- **XREAL Eye camera** to enable **6DoF tracking**
- **Beam Pro** as the host device (compute + app runtime)

With this combination, you can use the XREAL SDK to build a lightweight application that renders your instructor video either:
- as multiple fixed-direction surfaces (front / left / back / optionally right), similar to your current 3-screen setup, or
- as a curved “wraparound” surface (e.g., an arc/cylinder) so there’s always an instructor view in your field of view.

**Daylight note:** in very bright outdoor conditions, perceived contrast can be reduced. For best results we recommend using a small **visor/shade** (or other glare control) and/or boosting contrast in the video, as you mentioned.

If you can confirm whether you plan to use this **indoors only** or also **outdoors in direct sun**, we can share best-practice guidance for brightness/contrast and the most comfortable mounting/fit for physical activity.

Best regards,
XREAL Support

### Notes / follow-ups
- Confirm which current XREAL products support **true 6DoF world-locking** in Tony’s target environment.
- If Tony wants a “wraparound” cylinder video, confirm recommended rendering approach and typical performance constraints.
- Daylight: set expectations about optical see-through contrast; suggest shade accessories.
