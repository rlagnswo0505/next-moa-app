import { createClient } from '@/app/utils/supabase/client';

type GetDealDetailParams = {
  p_deal_id: number;
};

export const getDealDetail = async (params: GetDealDetailParams) => {
  const supabase = createClient();
  const { data, error } = await supabase.rpc('get_deal_detail', params);
  if (error) throw error;
  return data;
};
