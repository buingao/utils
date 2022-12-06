const regexps = {
  is_all_num: /^[0-9]*$/,
  is_n_length_num: /^\d{n}$/,
  is_n_more_length_num: /^\d{n,}$/,
  is_m2n_length_num: /^\d{m,n}$/,
  is_Chinese: /^[\u4e00-\u9fa5]{0,}$/,
  is_phone: /^1(3|4|5|6|7|8|9)\d{9}$/
}

export default regexps
