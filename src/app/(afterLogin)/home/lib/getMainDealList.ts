import { createClient } from '@/app/utils/supabase/client';

export type GetMainDealListParams = {
  p_category_id?: number;
  p_keyword?: string;
  p_limit_cnt?: number;
  p_offset_cnt?: number;
  p_sort_by?: string;
  p_user_lat?: number;
  p_user_lng?: number;
};

export const getMainDealList = async (params: GetMainDealListParams) => {
  const supabase = createClient();
  const { data, error } = await supabase.rpc('get_main_deal_list', params);
  if (error) throw error;
  return data;
};
