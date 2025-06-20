import { createClient } from '@/utils/supabase/client';

export type GetCartItemsParams = {
  p_user_id: string;
};

export const getCartItems = async (params: GetCartItemsParams) => {
  const supabase = createClient();
  const { data, error } = await supabase.rpc('get_cart_items', params);
  if (error) throw error;
  return data;
};
