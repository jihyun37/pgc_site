# Pangyo Global Campus — Website

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4

## 실행

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## 구조

| 경로 | 내용 |
|---|---|
| `src/content/site.ts` | 메뉴, 주소, 교통, 입지 장점, 주차 안내, 브랜드 문구 |
| `src/content/rooms.ts` | 403 Business Room / 404 Guest Room (인원·침대·욕실·시설·사진) |
| `src/content/guide.ts` | 예약 안내, 이용 흐름, 게스트 가이드라인, FAQ |
| `src/content/contact.ts` | 문의 유형, 개인정보 수집 동의 문구 |
| `src/components/` | Header, Hero, SpaceScroller(스크롤 전환), SpacesGallery(슬라이더), RoomPage, ContactForm 등 |
| `public/images/` | PDF(PGC Overview_EN)·Notion에서 추출한 실제 사진 |

문구·사실 정보는 `src/content/`만 고치면 전체 페이지에 반영됩니다.

## 공개하지 않는 정보

공동현관 비밀번호, Wi-Fi 정보, 담당자 개인 연락처(휴대폰·WeChat·이메일), 관리사무소 번호는
코드에 넣지 않습니다. 예약 확정 게스트에게만 별도 가이드(현재 Notion)로 전달하세요.

## 문의 폼 설정 (배포 전 필수)

문의 폼은 [Resend](https://resend.com)로 이메일을 보냅니다. 환경변수가 없으면
폼은 "Online inquiries are not available yet" 안내를 보여주고 아무것도 보내지 않습니다.

`.env.local` (또는 호스팅 환경변수):

```
RESEND_API_KEY=re_xxxxxxxx
CONTACT_TO_EMAIL=문의를-받을-주소@회사도메인
CONTACT_FROM_EMAIL=PGC Website <noreply@인증한-도메인>   # 선택
```

배포 전 `src/content/contact.ts`의 보관 기간(retention)과 `/privacy` 내용을 운영사와 확인하세요.
