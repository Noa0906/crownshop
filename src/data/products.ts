export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  videoUrl?: string;
  thumbnail?: string;
}

export const categories = [
  "전체",
  "브롤스타즈",
  "로블록스",
  "카톡",
  "디스코드",
] as const;

export type Category = (typeof categories)[number];

export const products: Product[] = [
  {
    id: "bs-1",
    name: "프레3 방법 1",
    price: 30000,
    category: "브롤스타즈",
    description:
      "브롤스타즈 프레3 방법 1 상세 가이드. 초보자도 쉽게 따라할 수 있는 단계별 방법론과 팁을 제공합니다. 실전에서 바로 적용 가능한 전략 포함.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: "bs-2",
    name: "프레3 방법 2",
    price: 50000,
    category: "브롤스타즈",
    description:
      "브롤스타즈 프레3 방법 2 고급 가이드. 상위 랭커들이 사용하는 프로 수준의 전략과 노하우를 담고 있습니다. 더 높은 승률을 원하는 분들에게 추천.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: "bs-3",
    name: "무한탑 봇 방법",
    price: 10000,
    category: "브롤스타즈",
    description:
      "브롤스타즈 무한탑 봇 활용 방법. 자동화된 봇을 활용하여 효율적으로 게임을 진행하는 방법을 설명합니다. 시간 절약과 빠른 성장을 위한 필수 가이드.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: "bs-4",
    name: "test1",
    price: 10000,
    category: "브롤스타즈",
    description:
      "브롤스타즈 테스트 상품입니다. 상품 내용을 확인하기 위한 샘플 상품으로, 실제 구매 전 테스트용으로 활용할 수 있습니다.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: "rb-1",
    name: "test2",
    price: 50000,
    category: "로블록스",
    description:
      "로블록스 테스트 상품입니다. 로블록스 관련 상품의 구매 테스트용 샘플 상품으로, 상세 정보와 영상을 확인할 수 있습니다.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: "kt-1",
    name: "test3",
    price: 30000,
    category: "카톡",
    description:
      "카카오톡 관련 테스트 상품입니다. 카카오톡 관련 상품의 구매 테스트용 샘플 상품으로, 상세 정보와 영상을 확인할 수 있습니다.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: "dc-1",
    name: "test4",
    price: 5000,
    category: "디스코드",
    description:
      "디스코드 관련 테스트 상품입니다. 디스코드 관련 상품의 구매 테스트용 샘플 상품으로, 상세 정보와 영상을 확인할 수 있습니다.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: "dc-2",
    name: "자판기 소스코드",
    price: 5000,
    category: "디스코드",
    description:
      "디스코드 자판기 봇 소스코드. 서버에서 바로 사용할 수 있는 자동화 봇 소스코드를 제공합니다. 설치 방법과 커스터마이징 가이드 포함.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: "dc-3",
    name: "RPC",
    price: 7500,
    category: "디스코드",
    description:
      "디스코드 RPC(Rich Presence Client) 관련 상품입니다. 디스코드 상태 메시지를 자동으로 표시하고 커스터마이징하는 방법을 포함합니다.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
];
