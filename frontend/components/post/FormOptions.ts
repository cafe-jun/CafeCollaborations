type FormType = 'category' | 'recruitMember' | 'duration' | 'region';

const regionOptions: { label: string; value: string }[] = [
  { label: '서울', value: 'RE1000' },
  { label: '경기', value: 'RE1002' },
  { label: '강원', value: 'RE1003' },
  { label: '충북', value: 'RE1004' },
  { label: '충남', value: 'RE1005' },
  { label: '전북', value: 'RE1006' },
  { label: '전남', value: 'RE1007' },
  { label: '경북', value: 'RE1008' },
  { label: '제주', value: 'RE1009' },
];

const recruitMemberOptions: { label: string; value: string }[] = [
  { label: '기한없음', value: 'RM1000' }, // Indefinite
  { label: '1~5명', value: 'RM1002' }, // OneToFive
  { label: '6~10명', value: 'RM1003' }, // SixToTen
  { label: '10명 이상', value: 'RM1004' }, // MoreThanTen
];

const durationOptions: { label: string; value: string }[] = [
  { label: '1개월 미만', value: 'DU1000' }, // LessThanOneMonth
  { label: '1~3개월', value: 'DU1002' }, // OneToThreeMonths
  { label: '3~6개월', value: 'DU1003' }, // ThreeToSixMonths
  { label: '6개월 이상', value: 'DU1004' }, // MoreThanSixMonths
];

const categoryOptions: { label: string; value: string }[] = [
  { label: '숙박', value: 'CA1000' }, // Accommodation
  { label: '음식', value: 'CA1001' }, // Food
  { label: '패션', value: 'CA1002' }, // Fashion
  { label: '뷰티', value: 'CA1003' }, // Beauty
  { label: '앱', value: 'CA1004' }, // App
  { label: '생활용품', value: 'CA1005' }, // HouseholdGoods
  { label: '애완용품', value: 'CA1006' }, // PetSupplies
];

const fieldOptions = {
  category: categoryOptions,
  region: regionOptions,
  recruitMember: recruitMemberOptions,
  duration: durationOptions,
};

const getLabelByFormValue = (type: FormType, value: string) => {
  const typeOptions = fieldOptions[type];
  const option = typeOptions.find((type) => type.value === value);
  return option?.label;
};

export {
  regionOptions,
  recruitMemberOptions,
  durationOptions,
  categoryOptions,
  getLabelByFormValue,
};
