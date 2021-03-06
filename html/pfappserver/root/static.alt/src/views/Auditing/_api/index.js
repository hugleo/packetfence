import apiCall from '@/utils/api'
import store from '@/store'
import Vue from 'vue'

export default {
  allDhcpOption82Logs: params => {
    if (params.sort) {
      params.sort = params.sort.join(',')
    } else {
      params.sort = 'created_at,mac'
    }
    if (params.fields) {
      params.fields = params.fields.join(',')
    }
    return apiCall.get('dhcp_option82s', { params }).then(response => {
      return response.data
    })
  },
  searchDhcpOption82Logs: body => {
    return apiCall.post('dhcp_option82s/search', body).then(response => {
      return response.data
    })
  },
  getDhcpOption82Log: mac => {
    return apiCall.get(['dhcp_option82', mac]).then(response => {
      return response.data.item
    })
  },
  allRadiusLogs: params => {
    if (params.sort) {
      params.sort = params.sort.join(',')
    } else {
      params.sort = 'created_at,mac'
    }
    if (params.fields) {
      params.fields = params.fields.join(',')
    }
    return apiCall.get('radius_audit_logs', { params }).then(response => {
      return response.data
    })
  },
  searchRadiusLogs: body => {
    return apiCall.post('radius_audit_logs/search', body).then(response => {
      return response.data
    })
  },
  getRadiusLog: id => {
    return apiCall.get(['radius_audit_log', id]).then(response => {
      return response.data.item
    })
  },
  allDnsLogs: params => {
    if (params.sort) {
      params.sort = params.sort.join(',')
    } else {
      params.sort = 'created_at'
    }
    if (params.fields) {
      params.fields = params.fields.join(',')
    }
    return apiCall.get('dns_audit_logs', { params }).then(response => {
      return response.data
    })
  },
  searchDnsLogs: body => {
    return apiCall.post('dns_audit_logs/search', body).then(response => {
      return response.data
    })
  },
  getDnsLog: id => {
    return apiCall.get(`dns_audit_log/${id}`).then(response => {
      return response.data.item
    })
  },
  setPassthroughs: passthroughs => {
    return apiCall.patch('config/base/fencing', { passthroughs: passthroughs.join(',') }).then(response => {
      // Clear cached values
      Vue.set(store.state.config, 'baseFencing', false)
      if (store.state.$_bases) {
        Vue.set(store.state.$_bases.cache, 'fencing', false)
      }
      return response
    })
  }
}
